import RegisterUser from '../RegisterUser.vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';

describe('Register User', () => {
  it('has username input', () => {
    render(RegisterUser);
    const input = screen.queryByPlaceholderText('UserName');
    expect(input).toBeInTheDocument();
    expect(input).toContain('username');

  });

  it('has gender radio button', () => {
    const { getByTestId } = render(RegisterUser);
    const maleRadio = getByTestId('male');

    fireEvent.update(maleRadio, 'true');
    const result = maleRadio.hasAttribute('type').valueOf;
    //console.log(maleRadio.dataset(true));
    expect(maleRadio.textContent);
    // const radioType = screen.getAllByRole('radio');
    // console.log(radioType);
  });
});
