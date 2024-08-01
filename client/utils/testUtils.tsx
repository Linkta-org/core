import React from 'react';
import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './customTheme';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '@routes/index';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const AllTheProviders = ({
  router,
}: {
  router: ReturnType<typeof createRouter>;
}) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  {
    isAuthenticated = false,
    ...options
  }: { isAuthenticated?: boolean } & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const router = createRouter(isAuthenticated);
  const user = userEvent.setup();

  return {
    user,
    ...render(<AllTheProviders router={router} />, {
      wrapper: ({ children }) => (children ? <>{children}</> : <>{ui}</>),
      ...options,
    }),
  };
};

export * from '@testing-library/react';
export { customRender as render };
