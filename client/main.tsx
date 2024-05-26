import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import Theme from './utils/customTheme';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element with id "root" in the DOM.');
}

const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
