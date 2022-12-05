import { render, screen } from '@testing-library/vue';
import MainLayout from './MainLayout.vue';
import userEvent from '@testing-library/user-event';
import router from '../router/index';

const setup = async (path: string) => {
  render(MainLayout, {
    global: { plugins: [router] },
  });
  router.replace(path);
  console.log('path: ' + path);
  await router.isReady();
};

describe('Routing', () => {
  it('displays homepage Image at /', () => {
    render(MainLayout);
    const page = screen.queryByTestId('home-page-image');
    expect(page).toBeInTheDocument();
    //expect(page).not.toBeInTheDocument();
  });

  //  if you keep duplicating the same test with different data. it.each allows you to write the test once and pass data in.
  it.each`
    path   | pageTestId
    ${'/'} | ${'home-page-image'}
  `('displays $pageTestId when $path is at /', async ({ path, pageTestId }) => {
    await setup(path);
    const page = await screen.findAllByTestId(pageTestId);
    expect(page[1]).toBeInTheDocument();
  });

  it.each`
    initialPath | onClick     | visiblePage
    ${'/'}      | ${'signUp'} | ${'sign-up-page'}
    ${'/'}      | ${'login'} | ${'login-page'}
  `(
    'it routes to $visiblePage after clicking $onClick link',
    async ({ initialPath, onClick, visiblePage }) => {
      await setup(initialPath);
      const link =  screen.queryByRole('link', { name: onClick })  ;
      console.log('link',link);
      if (link) {
        await userEvent.click(link);
        const page = await screen.findByTestId(visiblePage);
        expect(page).toBeInTheDocument();
      }
    }
  );

});
