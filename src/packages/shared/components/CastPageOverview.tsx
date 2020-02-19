import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { TitleTag } from '../entities/TitleTag';
import { Box } from '@material-ui/core';
import EditCastPageOverview from './edit/EditCastPageOverview';

export interface CastPageOverviewProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
  editing?: boolean;
  onTitleChange?: (newTitle: string) => void;
  onSummaryChange?: (newSummary: string) => void;
}

const CastPageOverview: FunctionComponent<CastPageOverviewProps> = (props):ReactElement => {
  return (
    <React.Fragment>
      {!props.editing &&
        <Box>
          <Typography variant={props.titleTag ? props.titleTag : TitleTag.Header1} gutterBottom>
            {props.title} 
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {props.summary} 
          </Typography>
        </Box>
      }
      {props.editing &&
        <EditCastPageOverview
          title={props.title}
          summary={props.summary}
          onTitleChange={props.onTitleChange}
          onSummaryChange={props.onSummaryChange}></EditCastPageOverview>
      }
    </React.Fragment>
  );
}

export default CastPageOverview;
