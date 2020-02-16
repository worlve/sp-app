import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { TitleTag } from '../entities/TitleTag';
import { Box } from '@material-ui/core';

export interface CastPageOverviewProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
}

const CastPageOverview: FunctionComponent<CastPageOverviewProps> = (props):ReactElement => {
  return (
    <Box>
      <Typography variant={props.titleTag ? props.titleTag : TitleTag.Header1} gutterBottom>
        {props.title} 
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        {props.summary} 
      </Typography>
    </Box>
  );
}

export default CastPageOverview;
