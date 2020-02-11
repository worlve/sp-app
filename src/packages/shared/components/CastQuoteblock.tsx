import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export interface CastQuoteblockProps {}

const useStyles = makeStyles({
  quoteblock: {
    'border-left': `3px solid ${grey[900]}`,
    'background-color': grey[100],
    'padding': 10
  },
});

const CastQuoteblock: FunctionComponent<CastQuoteblockProps> = (props) => {
  const classes = useStyles();

  return (
    <Typography className={classes.quoteblock} variant="body1" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default CastQuoteblock;
