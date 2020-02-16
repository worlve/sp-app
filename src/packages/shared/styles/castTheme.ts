import { createMuiTheme, makeStyles, createStyles, Theme } from "@material-ui/core";
import { indigo, grey } from "@material-ui/core/colors";

export const castTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#222'
    },
    secondary: {
      light: indigo.A100,
      main: indigo.A400,
      dark: indigo.A700,
      contrastText: '#fff',
    },
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

const SELECTION_BORDER_SIZE = 8;
const PAGE_PADDING = 24;  // @tODO: extract from theme instead

export const hoverableSelection = makeStyles((theme: Theme) =>
  createStyles({
    selectedSection: {
      marginLeft: -1 * PAGE_PADDING,
      paddingLeft: PAGE_PADDING - SELECTION_BORDER_SIZE,
      borderLeftWidth: SELECTION_BORDER_SIZE,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
    },
    hoverableSection: {
      transition: 'all .1s',
      transitionTimingFunction: 'ease-out',
      marginLeft: -1 * PAGE_PADDING,
      paddingLeft: PAGE_PADDING,
      borderLeftWidth: 0,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.light,
      '&:hover': {
        borderLeftWidth: SELECTION_BORDER_SIZE,
        paddingLeft: PAGE_PADDING - SELECTION_BORDER_SIZE,
      }
    },
  }),
);