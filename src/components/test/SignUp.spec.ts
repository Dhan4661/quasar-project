import { render } from '@testing-library/vue';
import SignUp from '../SignUp.vue';
//import userEvent from '@testing-library/user-event';

//signup title text
it('Sign Up', () => {
  const { getByText, getByTestId, container } = render(SignUp);
  expect(getByText('NEW TO FABBOOK REGISTER HERE')).toBeInTheDocument();

  expect(getByTestId('name')).toBeInTheDocument();
  //const inputName = screen.getByTestId('name');
  expect(getByTestId('email')).toBeInTheDocument();
  // const inputEmail = screen.getByTestId('email');
  expect(getByTestId('number')).toBeInTheDocument();
  //const inputNumner = screen.getByTestId('number');
  expect(getByTestId('age')).toBeInTheDocument();
  //const inputAge = screen.getByTestId('age');

  expect(getByTestId('accept')).toBeInTheDocument();
  //const inputAccept = screen.getByTestId('accept');

  expect(getByText('Submit')).toBeInTheDocument();
  const submitButton = container.querySelector('q-btn');
  expect(submitButton?.nodeType).toEqual(1);

  // const qbuttons = container.querySelectorAll('q-btn');
  // expect(qbuttons.length).toEqual(2);
});

/*
it('QSelect check', () => {
  render(SignUp);
  console.log(screen.getByRole('gender'));
});
*/
