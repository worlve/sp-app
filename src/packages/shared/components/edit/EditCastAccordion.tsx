import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

export interface EditCastAccordionProps {
  title?: string;
  summary?: string;
  elementId?: string;
  content?: string;
  onDetailChange?: (newTitle: string, newSummary: string, newMarkdown: string) => void;
}

const ExpansionPanel = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: -1 * theme.spacing(2),
      marginRight: -1 * theme.spacing(2),
    },
    '&$expanded': {
      [theme.breakpoints.down('xs')]: {
        marginLeft: -1 * theme.spacing(2),
        marginRight: -1 * theme.spacing(2),
      },
    },
  },
  expanded: {},
}))(MuiExpansionPanel);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expansionDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      flexBasis: '40%',
      flexShrink: 0,
    },
    secondaryHeading: {
      marginLeft: theme.spacing(1),
    },
    selectedSection: {
      borderLeftWidth: theme.spacing(1),
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
    },
  }
));

const EditCastAccordion: FunctionComponent<EditCastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = !!useMediaQuery(theme.breakpoints.down('xs'));


  return (
    <ExpansionPanel
      id={props.elementId}
      className={isSmallScreen ? '' : classes.selectedSection}>
      { /* the reason the highlight is only on the summary is that the highlight animation stutters and lags
          when the panel details contains images */ }
      <ExpansionPanelSummary
        expandIcon={isSmallScreen ? undefined : <ExpandMoreIcon />}
        aria-controls="panel-content">
        <Typography className={classes.heading} variant='body1'>{props.title}</Typography>
        <Typography className={classes.secondaryHeading} variant='subtitle1'>{props.summary}</Typography>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  );
}

export default EditCastAccordion;
