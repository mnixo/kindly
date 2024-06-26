import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthForm from '../components/AuthForm';

describe('AuthForm', () => {
  test('Sign Up', async () => {
    const buttonText = 'Register';

    // render the AuthForm component
    render(
      <AuthForm onSubmit={() => null} buttonText={buttonText} isSignUp={true} />
    );

    // assert the username input
    const username = screen.queryByLabelText('Username');
    expect(username).toBeInTheDocument();
    expect(username).toBeVisible();
    expect(username).toHaveValue('');
    expect(username).toHaveAttribute('placeholder', 'Your Username');
    expect(username).toBeRequired();

    // assert the email input
    const email = screen.queryByLabelText('Email');
    expect(email).toBeInTheDocument();
    expect(email).toBeVisible();
    expect(email).toHaveValue('');
    expect(email).toHaveAttribute('placeholder', 'you@example.com');
    expect(email).toBeRequired();

    // assert the password input
    const password = screen.queryByLabelText('Password');
    expect(password).toBeInTheDocument();
    expect(password).toBeVisible();
    expect(password).toHaveValue('');
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('placeholder', '••••••••');
    expect(password).toBeRequired();

    // assert the password confirmation input
    const passwordConfirmation = screen.queryByLabelText('Confirm Password');
    expect(passwordConfirmation).toBeInTheDocument();
    expect(passwordConfirmation).toBeVisible();
    expect(passwordConfirmation).toHaveValue('');
    expect(passwordConfirmation).toHaveAttribute('type', 'password');
    expect(passwordConfirmation).toHaveAttribute('placeholder', '••••••••');
    expect(passwordConfirmation).toBeRequired();

    // get buttons
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);

    // assert the toggle password button
    const togglePassword = buttons[0];
    expect(togglePassword).toBeInTheDocument();
    expect(togglePassword).toBeVisible();
    expect(togglePassword).toHaveTextContent('Show');

    // assert the register button
    const register = buttons[1];
    expect(register).toBeInTheDocument();
    expect(register).toBeVisible();
    expect(register).toHaveTextContent(buttonText);

    // get checkboxes
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    // assert the share email checkbox
    const shareEmail = checkboxes[0];
    expect(shareEmail).toBeInTheDocument();
    expect(shareEmail).toBeVisible();
    expect(shareEmail).not.toBeChecked();

    // assert the is refugee checkbox
    const isRefugee = checkboxes[1];
    expect(isRefugee).toBeInTheDocument();
    expect(isRefugee).toBeVisible();
    expect(isRefugee).not.toBeChecked();
  });

  test('Log in', async () => {
    const buttonText = 'Login';

    // render the AuthForm component
    render(
      <AuthForm
        onSubmit={() => null}
        buttonText={buttonText}
        isSignUp={false}
      />
    );

    // assert the username input (there is none)
    const username = screen.queryByLabelText('Username');
    expect(username).not.toBeInTheDocument();

    // assert the email input
    const email = screen.queryByLabelText('Email');
    expect(email).toBeInTheDocument();
    expect(email).toBeVisible();
    expect(email).toHaveValue('');
    expect(email).toHaveAttribute('placeholder', 'you@example.com');
    expect(email).toBeRequired();

    // assert the password input
    const password = screen.queryByLabelText('Password');
    expect(password).toBeInTheDocument();
    expect(password).toBeVisible();
    expect(password).toHaveValue('');
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('placeholder', '••••••••');
    expect(password).toBeRequired();

    // assert the password confirmation input (there is none)
    const passwordConfirmation = screen.queryByLabelText('Confirm Password');
    expect(passwordConfirmation).not.toBeInTheDocument();

    // get buttons
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);

    // assert the toggle password button
    const togglePassword = buttons[0];
    expect(togglePassword).toBeInTheDocument();
    expect(togglePassword).toBeVisible();
    expect(togglePassword).toHaveTextContent('Show');

    // assert the register button
    const register = buttons[1];
    expect(register).toBeInTheDocument();
    expect(register).toBeVisible();
    expect(register).toHaveTextContent(buttonText);

    // get checkboxes (there are none)
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(0);
  });

  test('Show password', async () => {
    // render the AuthForm component
    render(<AuthForm onSubmit={() => null} buttonText={''} isSignUp={false} />);

    // password input is still hiding value
    const password = screen.queryByLabelText('Password');
    expect(password).toHaveAttribute('type', 'password');
    // show password toggle is still deactivated, showing 'Show'
    const togglePassword = screen.queryAllByRole('button')[0];
    expect(togglePassword).toHaveTextContent('Show');

    // user types a password
    const passwordValue = 'password123';
    await userEvent.type(password, passwordValue);
    // user clicks the toggle password button
    await userEvent.click(togglePassword);

    // password input is now showing value
    expect(password).toHaveAttribute('type', 'text');
    // show password toggle is now activated, showing 'Hide'
    expect(togglePassword).toHaveTextContent('Hide');
    // password input has the correct value
    expect(password).toHaveValue(passwordValue);

    // user clicks the toggle password button again
    await userEvent.click(togglePassword);

    // password input is back to hiding value
    expect(password).toHaveAttribute('type', 'password');
    // show password toggle is back to deactivated, showing 'Show'
    expect(togglePassword).toHaveTextContent('Show');
  });
});
