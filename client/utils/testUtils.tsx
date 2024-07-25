import type { ReactElement } from 'react';
import React from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './customTheme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <CssBaseline />
            {children}
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const user = userEvent.setup();

  return { user, ...render(ui, { wrapper: AllTheProviders, ...options }) };
};

export * from '@testing-library/react';
export { customRender as render };
