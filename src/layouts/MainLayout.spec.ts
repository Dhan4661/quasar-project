import { render, screen } from '@testing-library/vue';

import MainLayout from './MainLayout.vue';

describe('Routing', () => {
  it('displays homepage Image at /', () => {
    render(MainLayout);
    const page = screen.queryByTestId('home-page-image');
    expect(page).toBeInTheDocument();
    //expect(page).not.toBeInTheDocument();
  });

  //  if you keep duplicating the same test with different data. it.each allows you to write the test once and pass data in.
  it.each`
    path           | pageTestId
    ${'/'}         | ${'home-page-image'}
  `('displays $pageTestId when $path is at /', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(MainLayout);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });
});
