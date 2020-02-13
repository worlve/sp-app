import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  propertyWrapper: {
    display: 'flex',
    'align-items': 'center',
    'margin': '10px 0',
  },
  propertyKey: {
    'background-color': grey[100],
    'border-radius': 10,
    'padding': '0 10px',
    'text-transform': 'uppercase',
    'color': grey[500],
    'font-weight': 700,
  },
  propertyValue: {
    'margin-left': 10,
  },
});

export interface CastPropertyProps {
  propertyKey: string;
  value?: string | number | undefined;
}

const CastProperty: FunctionComponent<CastPropertyProps> = (props):ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.propertyWrapper}>
      <Typography className={classes.propertyKey} variant="body2">
        {props.propertyKey} :
      </Typography>
      <Typography className={classes.propertyValue} variant="body1">
        {props.value} 
      </Typography>
    </div>
  );
}

export default CastProperty;
