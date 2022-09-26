import { render, screen } from '@testing-library/vue';
import MainLayout from './MainLayout.vue';
import userEvent from '@testing-library/user-event';
import router from '../router/index';

const setup = async (path: string) => {
  render(MainLayout, {
    global: { plugins: [router] },
  });
  router.replace(path);
  await router.isReady();
};

describe('Routing', () => {
  it('displays homepage Image at /', () => {
    render(MainLayout);
    debugger;
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
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    initialPath | onClick     | visiblePage
    ${'/'}      | ${'SignUp'} | ${'sign-up-page'}
  `(
    'it routes to $visiblePage after clicking $onClick link',
    async ({ initialPath, onClick , visiblePage }) => {
      await setup(initialPath);
      console.log('link', initialPath);
      const link = screen.queryByRole('link', { name: onClick });
      await userEvent.click(link);
      const page = screen.queryByTestId(visiblePage);
      expect(page).toBeInTheDocument();
    }
  );

  it('it routes to signup page after clicking signup link', async () => {
    render(MainLayout);
    const link = screen.queryByRole('link', { name: 'signUp' });
    //console.log('link', link);
    //await userEvent.click(link);
  });
});
