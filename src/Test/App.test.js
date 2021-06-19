import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders User Input', () => {
  render(<App />);
  const userInput = screen.getByTestId(
      'username-input');
  expect(userInput).toBeInTheDocument();
});
