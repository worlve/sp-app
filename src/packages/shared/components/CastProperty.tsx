import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  propertyWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  propertyKey: {
    backgroundColor: grey[100],
    borderRadius: 10,
    padding: '0 10px',
    textTransform: 'uppercase',
    color: grey[600],
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  propertyValue: {
    marginLeft: 10,
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
