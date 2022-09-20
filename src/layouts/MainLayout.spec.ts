import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';

import MainLayout from './MainLayout.vue';

describe('Routing', () => {
  it('displays homepage Image at /', () => {
    render(MainLayout);
    const page = screen.queryByTestId('home-page-image');
    expect(page).toBeInTheDocument();
    //expect(page).not.toBeInTheDocument();
  });

  it.each`
    path   | pageTestId
    ${'/'} | ${'home-page-image'}
  `('displays homepage Image at /', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(MainLayout);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });
});
