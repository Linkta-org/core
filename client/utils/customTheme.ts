import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles/createTheme';

// starter theme - modify as needed
const themeOptions: ThemeOptions = {
  palette: {
    divider: '#4F5D66',
    primary: {
      light: '#3d8590',
      main: '#23616a',
      dark: '#01383f',
      contrastText: '#f5f5f5',
    },
    secondary: {
      light: '#ffca7c',
      main: '#ffa51b',
      dark: '#fb8800',
      contrastText: '#01383f',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#fb8800',
    },
    background: {
      paper: '#eeeeee',
      default: '#01383f',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--divider-gray': '#D9D9D9',
          '--foundation-N200': '#4F5D66',
          '--primary-light': '#3d8590',
          '--primary-main': '#23616a',
          '--primary-dark': '#01383f',
          '--primary-contrastText': '#f5f5f5',
          '--secondary-light': '#ffca7c',
          '--secondary-main': '#ffa51b',
          '--secondary-dark': '#fb8800',
          '--secondary-contrastText': '#01383f',
          '--text-primary': '#F5F5F5',
          '--text-secondary': '#fb8800',
          '--background-paper': '#eeeeee',
          '--background-default': '#01383f',
          '--hover-box-shadow': 'inset 0px 0px 4px rgba(159, 133, 18, 0.4)',
          '--hover-background-color': 'rgba(255, 255, 255, 0.15)',
          '--padding-default': '1rem',
          '--padding-small': '0.5rem',
          '--gap-default': '0.5rem',
          '--gap-small': '0.25rem',
          '--height-tab-default': '2.375rem',
          '--border-radius-default': '0.4rem',
          '--border-highlight-default': '1px solid rgba(159, 133, 18, 0.4)',
        },
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'Roboto, sans-serif',
          backgroundColor: 'var(--primary-main)',
          color: 'var(--text-primary)',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
