import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import EditCastProperty from './edit/EditCastProperty';

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
  editing?: boolean;
  onPropertyChange?: (newValue: string) => void;
}

const CastProperty: FunctionComponent<CastPropertyProps> = (props):ReactElement => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {!props.editing &&
        <div className={classes.propertyWrapper}>
          <Typography className={classes.propertyKey} variant="body2">
            {props.propertyKey} :
          </Typography>
          <Typography className={classes.propertyValue} variant="body1">
            {props.value} 
          </Typography>
        </div>
      }
      {props.editing &&
        <EditCastProperty
          propertyKey={props.propertyKey}
          value={props.value}
          onValueChange={props.onPropertyChange}></EditCastProperty>
      }
    </React.Fragment>
  );
}

export default CastProperty;
