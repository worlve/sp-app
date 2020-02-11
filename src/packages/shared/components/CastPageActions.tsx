import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/Details';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(4),
    },
  }),
);

export interface CastPageActionsProps {}

const actions = [
  { icon: <DeleteIcon />, name: '!!Delete' },
];

const CastPageActions = (props: CastPageActionsProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SpeedDial
      className={classes.speedDial}
      ariaLabel="SpeedDial openIcon CastPageActions"
      icon={<SpeedDialIcon icon={<DetailsIcon />} openIcon={<EditIcon />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}

export default CastPageActions;
