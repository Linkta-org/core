// App.unit.test.tsx
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
      render(<App />, { isAuthenticated });
    });
  };

  it('renders MainLayout when authenticated', async () => {
    await setup(true);

    // Adjust this to match actual content in MainLayout
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('renders UnauthorizedLayout when not authenticated', async () => {
    await setup(false);

    expect(
      screen.getByText('2024 Linkta L.L.C. All rights Reserved'),
    ).toBeInTheDocument();
  });
});
