import { render, screen } from '@utils/testUtils';
import NotFoundPage from '@features/error-pages/NotFoundPage';
import React from 'react';

describe('NotFoundPage Component', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the "Page could not be found" message', async () => {
    render(<NotFoundPage />, { initialEntries: ['/non-existing-route'] });
    expect(screen.getByText(/Page could not be found/)).toBeInTheDocument();
  });

  it('should render the "Oopsie! Looks like the page got lost" message', async () => {
    render(<NotFoundPage />, { initialEntries: ['/non-existing-route'] });
    expect(
      screen.getByText(/Oopsie! Looks like the page got lost/),
    ).toBeInTheDocument();
  });

  it('should render the "404" message', async () => {
    render(<NotFoundPage />, { initialEntries: ['/non-existing-route'] });
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it('should navigate to the homepage when "Return to Homepage" button is clicked', async () => {
    const { user } = render(<NotFoundPage />, {
      initialEntries: ['/non-existing-route'],
    });

    await user.click(
      screen.getByRole('button', { name: /return to homepage/i }),
    );

    expect(
      await screen.findByText(
        /Revolutionizing Learning: Intuitive Visualization for Complex Concepts/i,
      ),
    ).toBeInTheDocument();
  });
});
