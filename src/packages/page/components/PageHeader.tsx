import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { Page } from '../entities/Page';

export interface PageHeaderProps {
  page?: Page;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <div className="PageHeader">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            { props.page ? props.page.name : '' }
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="profile">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PageHeader;
