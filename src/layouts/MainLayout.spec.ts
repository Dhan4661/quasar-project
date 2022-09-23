import { render, screen } from '@testing-library/vue';
import MainLayout from './MainLayout.vue';
import userEvent from '@testing-library/user-event';
import routes from '../router/routes'


const setup = async (path : string) => {
  window.history.pushState({}, '', path);
  render(MainLayout, {
    routes,
  });
  //await routes.isReady();
}

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
  `('displays $pageTestId when $path is at /', ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it('it routes to signup page after clicking signup link', async () => {
    render(MainLayout);
    const link = screen.queryByRole('link', { name: 'signUp' });
    console.log('link',link);
    //await userEvent.click(link);
  });
});
