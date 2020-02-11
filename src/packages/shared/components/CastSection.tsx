import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { TitleTag } from '../entities/TitleTag';
import { Box, makeStyles, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export interface CastSectionProps {
  titleTag?: TitleTag;
  title?: string;
}

const useStyles = makeStyles({
  section: {
    'margin-top': 40,
  },
  sectionTitle: {
    'margin-top': 10,
    'text-transform': 'uppercase',
    'color': grey[300],
  }
});

const CastSection: FunctionComponent<CastSectionProps> = (props) => {
  const classes = useStyles();

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
