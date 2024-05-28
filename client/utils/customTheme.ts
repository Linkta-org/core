import { createTheme } from '@mui/material/styles';

// starter theme - modify as needed
const theme = createTheme({
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
});

export default theme;
