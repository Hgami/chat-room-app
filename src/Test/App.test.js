import { render, screen } from '@testing-library/react';
import App from '../App';

/*
A simple unit test cae in which user inputs into login form
and it renders that information.
 */

test('renders User Input', () => {
  render(<App />);
  const userInput = screen.getByTestId(
      'username-input');
  expect(userInput).toBeInTheDocument();
});
