import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme } from '@material-ui/core';

export interface CastAccordionProps {
  title?: string;
  summary?: string;
  onClick?: () => void;
  highlight?: boolean;
  elementId?: string;
}

const SELECTION_BORDER_SIZE = 8;
const DEFAULT_BORDER_SIZE = 24;

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
    transition: 'all .1s',
    transitionTimingFunction: 'ease-out',
    borderLeftWidth: 0,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.light,
    paddingLeft: DEFAULT_BORDER_SIZE + SELECTION_BORDER_SIZE,
    '&:hover': {
      borderLeftWidth: SELECTION_BORDER_SIZE,
      paddingLeft: DEFAULT_BORDER_SIZE,
    }
  }
}));

const CastAccordion: FunctionComponent<CastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <ExpansionPanel
      id={props.elementId}
      className={props.highlight ? classes.selectedSection : ''}
      expanded={expanded}
      onChange={handleChange}
      onClick={props.onClick}>
      { /* the reason the highlight is only on the summary is that the highlight animation stutters and lags
           when the panel details contains images */ }
      <ExpansionPanelSummary
        className={props.highlight ? '' : classes.hoverableSection}
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
      { expanded && 
        <div>
          {props.children}
        </div>
      }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default CastAccordion;
