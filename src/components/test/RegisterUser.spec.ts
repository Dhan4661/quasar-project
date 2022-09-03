import RegisterUser from '../RegisterUser.vue';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import axios from 'src/boot/axios';



describe('Register User', () => {
  it('username text content', () => {
    const { container } = render(RegisterUser);
    const userInput = container.querySelector('input');
    expect(userInput?.type).toBe('text');
  });
  it('username text content', () => {
    const { container } = render(RegisterUser);
    const maleRadio = container.querySelector('test');
    console.log(maleRadio);
  });
});

//   it('has gender radio button', () => {
//     const { getByTestId } = render(RegisterUser);
//     const maleRadio = getByTestId('male');

//     fireEvent.update(maleRadio, 'true');
//     const result = maleRadio.hasAttribute('type').valueOf;
//     //console.log(maleRadio.dataset(true));
//     console.log(maleRadio.textContent);
//     expect(maleRadio.textContent);
//     // const radioType = screen.getAllByRole('radio');
//     // console.log(radioType);
//   });
// });

//Udemy reference
/* Testing to see if the component is rendering. */
it('should be able to render a custom component', () => {
  const { container } = render(RegisterUser);
  expect(container).toBeInTheDocument();
});

/* Checking to see if the input is in the document. */
it('has the Username input', () => {
  render(RegisterUser);

  //label of the username
  const input = screen.queryByLabelText('UserName');
  expect(input).toBeInTheDocument();

  //placeholder of the username field
  const UsernamePH = screen.queryByPlaceholderText('UserName');
  expect(UsernamePH).toBeInTheDocument();

  //type of the username
  const username = screen.getByPlaceholderText('UserName');
  expect(username.getAttribute('type')).toBe('text');

  //value of the username
  const usernameValue = screen.getByPlaceholderText('UserName');
  expect(usernameValue.getAttribute('value')).toBe(null);
});

/* Checking to see if the input is in the document. */
it('has the Email input', () => {
  render(RegisterUser);
  const input = screen.queryByLabelText('Email');
  expect(input).toBeInTheDocument();
});

/* Checking to see if the input is in the document. */

it('has the test input', () => {
  render(RegisterUser);
  const test = screen.getByTestId('test');
  expect(test.getAttribute('type')).toBe('text');
});

it('has the accept input', () => {
  render(RegisterUser);
  const accept = screen.getByTestId('accept');
  expect(accept).toBeInTheDocument;
  expect(accept.getAttribute('class')).toBe('p10');
  /* Setting the value of the accept input to true. */
  // console.log(accept.setAttribute('value', 'true'));
  // console.log(accept.getAttribute('value'));
});
it('has the select input', () => {
  render(RegisterUser);
  const selectTest = screen.getByTestId('selectTest');
  expect(selectTest).toBeInTheDocument();
  expect(selectTest.getAttribute('class')).toBe('p10');
  console.log(selectTest.getAttribute('options')?.includes('Google'));
  // expect(selectTest.getAttribute('options')).toBe('submit');

});

it('has the submit button', () => {
  render(RegisterUser);
  const submit = screen.getByTestId('signup');
  expect(submit.getAttribute('type')).toBe('submit');

});


describe('interaction', () => {
  it('on submit button click', async () => {
    render(RegisterUser);
    const test = screen.getByTestId('test');
    const accept = screen.getByTestId('accept');
    const signup = screen.getByTestId('signup');
    expect(signup).toBeDisabled;
    await userEvent.type(test,'Hello World!');
    await userEvent.type(accept,'false');
    //expect(accept).toHaveValue('false');
    //expect(accept.getAttribute('value')).toBe('false');
    expect(signup).toBeEnabled;
  });
})


describe('mocking', () => {
  it('sends inputs to backend after clicking the button', async () => {
    render(RegisterUser);
    const test = screen.getByTestId('test');
    const accept = screen.getByTestId('accept');
    const selectTest = screen.getByTestId('selectTest');
    //const signup = screen.getByTestId('signup');

    await userEvent.type(test,'Hello World!');
    await userEvent.type(accept,'false');
    await userEvent.type(selectTest,'Google');

    // const mockFn = jest.fn();
    // axios.post = mockFn;
  });
})
