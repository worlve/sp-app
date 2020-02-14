import { createMuiTheme } from "@material-ui/core";
import { indigo, grey } from "@material-ui/core/colors";

export const castTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#222'
    },
    secondary: indigo,
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '0.9rem',
      color: grey[700],
    },
  },
});

export const castPartitionTheme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '1.575rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.45rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.35rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 700,
    },
  },
});