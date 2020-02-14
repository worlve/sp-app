import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import localizer from '../../../utils/Localizer';

export interface CastSearchBarProps {
  title?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const CastSearchBar = (props: CastSearchBarProps):ReactElement => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={localizer.localeMap.default.search}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton aria-label="search options">
        <ArrowDropDownIcon />
      </IconButton>
    </Paper>
  );
}

export default CastSearchBar;
