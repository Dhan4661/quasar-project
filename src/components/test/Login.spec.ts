import { render, screen } from '@testing-library/vue';
import Login from '../Login.vue';
import userEvent from '@testing-library/user-event';
import router from '../../router/index';
import { useStore } from 'vuex';
const store = useStore();

const setup = async (path: string) => {
  render(Login, {
    global: { plugins: [router,store] },
  });
  router.replace(path);
  console.log('path: ' + path);
  await router.isReady();
};


  it.each`
    initialPath | onClick     | visiblePage
    ${'/Login'} | ${'submit'} | ${'home-page'}
  `(
    'it routes to $visiblePage after clicking $onClick link',
    async ({ initialPath, onClick, visiblePage }) => {
      await setup(initialPath);
      //const signup = screen.getByTestId('signup');
      debugger;
      const link =  screen.getByTestId(onClick)  ;
      console.log('link',visiblePage);
      if (link) {
        await userEvent.click(link);
        console.log('link',link);
        const page = await screen.findByTestId(visiblePage);
        expect(page).toBeInTheDocument();
      }
    }
  );

