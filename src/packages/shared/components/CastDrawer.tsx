import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import HomeIcon from '@material-ui/icons/Home';
import { SwipeableDrawer } from '@material-ui/core';
import localizer from '../../../utils/Localizer';

export interface CastDrawerProps {
  openDrawer: boolean;
  onDrawerOpenChange: (open: boolean) => void;
}

const useStyles = makeStyles({
  drawerItems: {
    width: 250,
  },
});

const CastDrawer = (props: CastDrawerProps):ReactElement => {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    props.onDrawerOpenChange(open);
  };

  return (
    <SwipeableDrawer
      open={props.openDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className={classes.drawerItems}>
        <List>
          <ListItem button key={'home'}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={localizer.localeMap.default.home} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'getPages'}>
            <ListItemIcon><LibraryBooksOutlinedIcon /></ListItemIcon>
            <ListItemText primary={localizer.localeMap.page.viewPages} />
          </ListItem>
          <ListItem button key={'createPage'}>
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary={localizer.localeMap.page.createPage} />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}

export default CastDrawer;
