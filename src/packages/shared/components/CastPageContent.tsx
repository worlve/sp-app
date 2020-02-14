import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import CastQuoteblock, { CastQuoteblockVariant } from './CastQuoteblock';
import { TitleTag } from '../entities/TitleTag';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

export interface CastPageContentProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
  onClickTitle?: () => void;
  onClickSummary?: () => void;
}

const SELECTION_BORDER_SIZE = 8;
const EDGE_OF_BOX = 24

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hoverableSection: {
      borderLeftWidth: SELECTION_BORDER_SIZE,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
      marginLeft: -1 * EDGE_OF_BOX,
      paddingLeft: EDGE_OF_BOX - SELECTION_BORDER_SIZE,
    },
  }),
);

const CastPageContent: FunctionComponent<CastPageContentProps> = (props):ReactElement => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.hoverableSection} onClick={props.onClickTitle} variant={props.titleTag ? props.titleTag : TitleTag.Header1} gutterBottom>
        {props.title} 
      </Typography>
      <CastQuoteblock onClick={props.onClickSummary} variant={CastQuoteblockVariant.Subtitle}>
        {props.summary} 
      </CastQuoteblock>
      {props.children}
    </React.Fragment>
  );
}

export default CastPageContent;
