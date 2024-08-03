import React from 'react';
import { render, screen, act } from '@utils/testUtils';
import App from '@/App';
import { vi } from 'vitest';
import useAuth from '@hooks/useAuth';

vi.mock('@hooks/useAuth', () => ({
  default: vi.fn(),
}));

describe('App', () => {
  const setup = async (isAuthenticated: boolean) => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated,
      isLoading: false,
    });

    await act(async () => {
      render(<App />, { initialEntries: ['/'] });
    });
  };
  // TODO add test for authorized routes
  // it('renders MainLayout when authenticated', async () => {
  //   await setup(true);

  //   expect(screen.getByText('Explore a New Topic')).toBeInTheDocument();
  // });

  it('renders UnauthorizedLayout when not authenticated', async () => {
    await setup(false);

    expect(
      screen.getByText(
        'Revolutionizing Learning: Intuitive Visualization for Complex Concepts',
      ),
    ).toBeInTheDocument();
  });
});
