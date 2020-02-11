import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import CastQuoteblock from './CastQuoteblock';
import { TitleTag } from '../entities/TitleTag';

export interface CastPageContentProps {
  titleTag?: TitleTag;
  title?: string;
  summary?: string;
}

const CastPageContent: FunctionComponent<CastPageContentProps> = (props) => {
  return (
    <React.Fragment>
      <Typography variant={props.titleTag ? props.titleTag : TitleTag.Header1} gutterBottom>
        {props.title} 
      </Typography>
      <CastQuoteblock>
        {props.summary} 
      </CastQuoteblock>
      {props.children}
    </React.Fragment>
  );
}

export default CastPageContent;
