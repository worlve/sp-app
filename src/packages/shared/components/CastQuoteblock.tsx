import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export interface CastQuoteblockProps {
  variant?: CastQuoteblockVariant;
  onClick?: () => void;
}

export enum CastQuoteblockVariant {
  Subtitle = 'subtitle1',
  Body = 'body1',
}

const useStyles = makeStyles({
  quoteblock: {
    borderLeft: `3px solid ${grey[900]}`,
    backgroundColor: grey[50],
    padding: 10
  },
});

const CastQuoteblock: FunctionComponent<CastQuoteblockProps> = (props):ReactElement => {
  const classes = useStyles();

  return (
    <Typography onClick={props.onClick} className={classes.quoteblock} variant={props.variant ? props.variant : CastQuoteblockVariant.Body} gutterBottom>
      {props.children}
    </Typography>
  );
}

export default CastQuoteblock;
