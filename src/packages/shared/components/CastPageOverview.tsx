import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { TitleTag } from '../entities/TitleTag';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

export interface CastPageOverviewProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
  onClick?: () => void;
  highlight?: boolean;
}

const SELECTION_BORDER_SIZE = 8;
const EDGE_OF_BOX = 24;  // @tODO: extract from theme instead

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedSection: {
      marginLeft: -1 * EDGE_OF_BOX,
      paddingLeft: EDGE_OF_BOX - SELECTION_BORDER_SIZE,
      borderLeftWidth: SELECTION_BORDER_SIZE,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
    },
    hoverableSection: {
      transition: 'all .1s',
      transitionTimingFunction: 'ease-out',
      marginLeft: -1 * EDGE_OF_BOX,
      paddingLeft: EDGE_OF_BOX,
      borderLeftWidth: 0,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.light,
      '&:hover': {
        borderLeftWidth: SELECTION_BORDER_SIZE,
        paddingLeft: EDGE_OF_BOX - SELECTION_BORDER_SIZE,
      }
    },
  }),
);

const CastPageOverview: FunctionComponent<CastPageOverviewProps> = (props):ReactElement => {
  const classes = useStyles();

  return (
    <Box id="test" onClick={props.onClick} className={props.highlight ? classes.selectedSection : classes.hoverableSection}>
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
