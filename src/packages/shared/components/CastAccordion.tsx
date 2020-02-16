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
    paddingLeft: 0,
  },
  hoverableSection: {
    transition: 'all .1s',
    transitionTimingFunction: 'ease-out',
    borderLeftWidth: 0,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.light,
    paddingLeft: SELECTION_BORDER_SIZE,
    '&:hover': {
      borderLeftWidth: SELECTION_BORDER_SIZE,
      paddingLeft: 0,
    }
  },
  // selectedSection: {
  //   boxShadow: `
  //     0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12),
  //     0 0 0 ${BORDER_SIZE}px ${theme.palette.secondary.main} inset
  //   `,
  // },
  // hoverableSection: {
  //   transition: 'all .1s',
  //   transitionTimingFunction: 'ease-out',
  //   boxShadow: `
  //     0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12),
  //     0 0 0 0 ${theme.palette.secondary.light} inset
  //   `,
  //   '&:hover': {
  //     boxShadow: `
  //       0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12),
  //       0 0 0 ${BORDER_SIZE}px ${theme.palette.secondary.light} inset
  //     `,
  //   }
  // },
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
      className={props.highlight ? classes.selectedSection : classes.hoverableSection}
      expanded={expanded}
      onChange={handleChange}
      onClick={props.onClick}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-content"
      >
        <Typography className={classes.heading} variant='body1'>{props.title}</Typography>
        <Typography className={classes.secondaryHeading} variant='subtitle1'>{props.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
        {props.children}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default CastAccordion;
