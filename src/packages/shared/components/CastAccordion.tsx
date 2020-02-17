import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme } from '@material-ui/core';

export interface CastAccordionProps {
  title?: string;
  summary?: string;
  onClick?: () => void;
  onCollapse?: () => void;
  highlight?: boolean;
  elementId?: string;
}

const SELECTION_BORDER_SIZE = 8;

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  heading: {
    flexBasis: '40%',
    flexShrink: 0,
  },
  secondaryHeading: {
  },
  selectedSection: {
    borderLeftWidth: SELECTION_BORDER_SIZE,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.main,
  },
  hoverableSection: {
    transition: 'border-color .4s',
    borderLeftStyle: 'solid',
    borderLeftColor: '#FFF',
    borderLeftWidth: 0,
    paddingLeft: SELECTION_BORDER_SIZE,
    '&:hover': {
      borderLeftColor: theme.palette.secondary.light,
      borderLeftWidth: SELECTION_BORDER_SIZE,
      paddingLeft: 0,
    }
  }
}));

const CastAccordion: FunctionComponent<CastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();

  const handleChange = () => {
    if (props.highlight) {
      // @NOTE: the onClick event fires after onChange, so it undoes the collapse.
      // So we wait for the cycle to resolve the full event queue.
      setTimeout(() => {
        if (props.onCollapse) {
          return props.onCollapse();
        }
      }, 0);
    }
  };

  return (
    <ExpansionPanel
      id={props.elementId}
      className={props.highlight ? classes.selectedSection : classes.hoverableSection}
      expanded={!!props.highlight}
      onChange={handleChange}
      onClick={props.onClick}>
      { /* the reason the highlight is only on the summary is that the highlight animation stutters and lags
          when the panel details contains images */ }
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-content"
      >
        <Typography className={classes.heading} variant='body1'>{props.title}</Typography>
        <Typography className={classes.secondaryHeading} variant='subtitle1'>{props.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      { /* the reason we do this is that anything complex inside the expansion, 
          such as images, causes significant lag during transitions */ }
      { !!props.highlight && 
        <div>
          {props.children}
        </div>
      }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default CastAccordion;
