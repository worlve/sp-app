import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

export interface CastAccordionProps {
  title?: string;
  summary?: string;
}

const useStyles = makeStyles({
  heading: {
    flexBasis: '40%',
    flexShrink: 0,
  },
  secondaryHeading: {
  },
});

const CastAccordion: FunctionComponent<CastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={handleChange}>
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