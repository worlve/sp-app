import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CastSearchBar from './CastSearchBar';
import Slide from '@material-ui/core/Slide';

export interface CastAppBarProps {
  title?: string;
  onSelectMenu: () => void;
}

const useStyles = makeStyles(theme => ({
  bar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const CastAppBar = (props: CastAppBarProps) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.onSelectMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { props.title }
          </Typography>
          <CastSearchBar></CastSearchBar>
          <IconButton edge="end" color="inherit" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default CastAppBar;
