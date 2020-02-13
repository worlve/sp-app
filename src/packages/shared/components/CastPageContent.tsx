import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import CastQuoteblock from './CastQuoteblock';
import { TitleTag } from '../entities/TitleTag';

export interface CastPageContentProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
  onClickTitle?: () => void;
  onClickSummary?: () => void;
}

const CastPageContent: FunctionComponent<CastPageContentProps> = (props):ReactElement => {
  return (
    <React.Fragment>
      <Typography onClick={props.onClickTitle} variant={props.titleTag ? props.titleTag : TitleTag.Header1} gutterBottom>
        {props.title} 
      </Typography>
      <CastQuoteblock onClick={props.onClickSummary}>
        {props.summary} 
      </CastQuoteblock>
      {props.children}
    </React.Fragment>
  );
}

export default CastPageContent;
