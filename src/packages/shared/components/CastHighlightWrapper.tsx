import React, { FunctionComponent, ReactElement } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { hoverableSelection } from '../styles/castTheme';

export interface CastHighlightWrapperProps {
  onClick?: () => void;
  highlight?: boolean;
  anchorId?: string;
}

// @NOTE: the anchor scrollTo goes just to the top of the content.  
// Having a little buffer gives some whitespace room.
const ANCHOR_TOP_BUFFER = 40;

const useStyles = makeStyles({
  anchorBuffer: {
    marginTop: -1 * ANCHOR_TOP_BUFFER,
    height: ANCHOR_TOP_BUFFER,
  },
});

const CastHighlightWrapper: FunctionComponent<CastHighlightWrapperProps> = (props):ReactElement => {
  const hoverableClasses = hoverableSelection();
  const classes = useStyles();

  return (
    <React.Fragment>
      <div id={props.anchorId} className={classes.anchorBuffer}></div>
      <Box onClick={props.onClick} className={props.highlight ? hoverableClasses.selectedSection : hoverableClasses.hoverableSection}>
        {props.children}
      </Box>
    </React.Fragment>
    
  );
}

export default CastHighlightWrapper;
