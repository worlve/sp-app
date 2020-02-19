import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoneIcon from '@material-ui/icons/Done';
import { Fab, Tooltip } from '@material-ui/core';
import localizer from '../../../utils/Localizer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabBox: {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      bottom: theme.spacing(2),
      right: theme.spacing(4),
    },
    notLeftmostFab: {
      marginLeft: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export interface CastSaveOrCancelActionsProps {
  disabledSave?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

const CastSaveOrCancelActions = (props: CastSaveOrCancelActionsProps):ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.fabBox}>
      <Tooltip title={localizer.localeMap.default.cancelHotKeys} placement="top">
        <Fab
          color="primary"
          size="medium"
          aria-label="cancel"
          onClick={props.onCancel}>
          <CloseOutlinedIcon />
        </Fab>
      </Tooltip>
      <Tooltip title={localizer.localeMap.default.saveHotKeys} placement="top">
        <Fab
          disabled={props.disabledSave}
          variant="extended"
          color="secondary"
          aria-label="save"
          onClick={props.onSave}
          className={classes.notLeftmostFab}>
          <DoneIcon className={classes.extendedIcon} />
          {localizer.localeMap.default.save}
        </Fab>
      </Tooltip>
    </div>
  );
}

export default CastSaveOrCancelActions;
