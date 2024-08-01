import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import CssBaseline from '@mui/material/CssBaseline';

import Theme from './customTheme';
import HomePage from '@features/home-page/HomePage';

import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';
import type { RouteObject } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});
const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </QueryClientProvider>
);

export default AllTheProviders;
const customRender = (
  ui: ReactElement,
  {
    routeConfig = [
      { path: '/', element: <HomePage /> },
      { path: '*', element: ui },
    ],
    initialEntries = ['/'],
    ...options
  }: {
    routeConfig?: Array<RouteObject>;
    initialEntries?: string[];
  } & Omit<RenderOptions, 'wrapper'> = {},
) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <MemoryRouter initialEntries={initialEntries}>
        <AllTheProviders>
          <Routes>
            {routeConfig.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </AllTheProviders>
      </MemoryRouter>,
      options,
    ),
  };
};

export * from '@testing-library/react';
export { customRender as render };
