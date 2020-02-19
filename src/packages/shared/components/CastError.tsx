import React, { FunctionComponent, ReactElement } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import localizer from '../../../utils/Localizer';
import { withStyles, Theme } from '@material-ui/core/styles';

export interface CastErrorProps {
  message: string;
  onRetry?: () => void;
}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.secondary.light,
  },
}))(Button);

const CastError: FunctionComponent<CastErrorProps> = (props):ReactElement => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      // @TODO: not sure when the "reason" is ever set.  So I'll just wait for this debugger to be hit.
      debugger;
      return;
    }
    setOpen(false);
  };

  const handleRetry = () => {
    if (props.onRetry) {
      props.onRetry();
    }
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={props.message}
      action={
        <React.Fragment>
          {props.onRetry && 
            <ColorButton
              color="secondary"
              size="small"
              onClick={handleRetry}>{ localizer.localeMap.default.retry }</ColorButton>
          }
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default CastError;
