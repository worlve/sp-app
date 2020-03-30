import React, { FunctionComponent, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';

export interface CastAccordionProps {
  title?: string;
  summary?: string;
  onClick?: () => void;
  onCollapse?: () => void;
  highlight?: boolean;
  elementId?: string;
  disabled?: boolean;
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
    title: {
      flexBasis: '40%',
      flexShrink: 0,
    },
    summary: {
      marginLeft: theme.spacing(1),
    },
    selectedSection: {
      borderLeftWidth: theme.spacing(1),
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
    },
    hoverableSection: {
      transition: 'border-color .4s',
      borderLeftStyle: 'solid',
      borderLeftColor: '#FFF',
      borderLeftWidth: 0,
      paddingLeft: theme.spacing(1),
      '&:hover': {
        borderLeftColor: theme.palette.secondary.light,
        borderLeftWidth: theme.spacing(1),
        paddingLeft: 0,
      }
    }
  }
));

const CastAccordion: FunctionComponent<CastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = !!useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = () => {
    if (props.disabled) {
      return;
    }
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

  const handleClick = () => {
    if (props.disabled || !props.onClick) {
      return;
    }
    props.onClick();
  };

  return (
    <ExpansionPanel
      id={props.elementId}
      className={isSmallScreen || props.disabled ? '' : props.highlight ? classes.selectedSection : classes.hoverableSection}
      expanded={!props.disabled && props.highlight}
      onChange={handleChange}
      onClick={handleClick}
      square={isSmallScreen}>
      { /* the reason the highlight is only on the summary is that the highlight animation stutters and lags
          when the panel details contains images */ }
      <ExpansionPanelSummary
        expandIcon={isSmallScreen || props.disabled ? undefined : <ExpandMoreIcon />}
        aria-controls="panel-content">
        <Typography className={classes.title} variant='body1'>{props.title}</Typography>
        <Typography className={classes.summary} variant='subtitle1'>{props.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
      { /* the reason we do this is that anything complex inside the expansion, 
          such as images, causes significant lag during transitions */ }
      { !!props.highlight && props.children }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default CastAccordion;
