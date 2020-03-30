import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { TitleTag } from '../entities/TitleTag';
import { Box, makeStyles, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export interface CastSectionProps {
  hideTitle?: boolean;
  titleTag?: TitleTag;
  title?: string;
}

const useStyles = makeStyles({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginTop: 40,
    textTransform: 'uppercase',
    color: grey[400],
  }
});

const CastSection: FunctionComponent<CastSectionProps> = (props):ReactElement => {
  const classes = useStyles();

  if (props.hideTitle) {
    return <Box className={classes.section}></Box>;
  }

  return (
    <Box className={classes.section}>
      <Divider />
      <Typography className={classes.sectionTitle} variant={props.titleTag ? props.titleTag : TitleTag.Header2} gutterBottom>
        {props.title} 
      </Typography>
      {props.children}
    </Box>
  );
}

export default CastSection;
