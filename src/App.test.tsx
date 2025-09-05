// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('redirects to login for protected route when unauthenticated', () => {
  // Start at a protected route
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <App />
    </MemoryRouter>
  );
  // Expect login heading
  const loginTitle = screen.getByText(/Login/i);
  expect(loginTitle).toBeInTheDocument();
});

test('shows validation error on login for empty submit', async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  const submit = screen.getByRole('button', { name: /login/i });
  submit.click();
  const emailError = await screen.findByText(/Enter a valid email/i);
  expect(emailError).toBeInTheDocument();
});
