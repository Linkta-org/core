import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// starter theme - modify as needed
const theme = createTheme({
  palette: {
    primary: {
      light: '#3d8590',
      main: '#23616a',
      dark: '#01383f',
      contrastText: '#ffca7c',
    },
    secondary: {
      light: '#ffca7c',
      main: '#ffa41b',
      dark: '#fb8800',
      contrastText: '#01383f',
    },
    text: {
      primary: '#3d8590',
      secondary: '#fb8800',
    },
    background: {
      paper: '#eeeeee',
      default: '#01383f',
    },
  },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element with id "root" in the DOM.');
}

const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
