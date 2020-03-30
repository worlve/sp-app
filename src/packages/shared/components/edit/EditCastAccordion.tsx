import React, { FunctionComponent, ReactElement } from 'react';
import { makeStyles, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, Theme, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import localizer from '../../../../utils/Localizer';

export interface EditCastAccordionProps {
  title?: string;
  summary?: string;
  elementId?: string;
  content?: string;
  onContentChange?: (newContent: string) => void;
  onTitleChange?: (newTitle: string) => void;
  onSummaryChange?: (newSummary: string) => void;
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
    selectedSection: {
      borderLeftWidth: theme.spacing(1),
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.secondary.main,
    },
    title: {
      flexBasis: '40%',
      flexShrink: 0,
    },
    summary: {
      marginLeft: theme.spacing(1),
    },
  }
));

const EditCastAccordion: FunctionComponent<EditCastAccordionProps> = (props):ReactElement => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = !!useMediaQuery(theme.breakpoints.down('xs'));
  const [titleValue, setTitleValue] = React.useState(props.title);
  const [summaryValue, setSummaryValue] = React.useState(props.summary);
  const [contentValue, setContentValue] = React.useState(props.content);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    if (props.onTitleChange) {
      props.onTitleChange(event.target.value);
    }
  };

  const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryValue(event.target.value);
    if (props.onSummaryChange) {
      props.onSummaryChange(event.target.value);
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentValue(event.target.value);
    if (props.onContentChange) {
      props.onContentChange(event.target.value);
    }
  };

  return (
    <ExpansionPanel
      id={props.elementId}
      className={isSmallScreen ? '' : classes.selectedSection}
      expanded={true}>
      { /* the reason the highlight is only on the summary is that the highlight animation stutters and lags
          when the panel details contains images */ }
      <ExpansionPanelSummary
        aria-controls="panel-content">
        <TextField
          className={classes.title}
          label={localizer.localeMap.page.edit.detailTitle}
          variant="outlined"
          value={titleValue}
          onChange={handleTitleChange}
          color="secondary"
          error={!titleValue}
          helperText={!titleValue ? localizer.localeMap.page.edit.errorDetailTitle : ''}
          required />
        <TextField
          className={classes.summary}
          label={localizer.localeMap.page.edit.detailSummary}
          variant="outlined"
          value={summaryValue}
          onChange={handleSummaryChange}
          fullWidth
          color="secondary" />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TextField
          label={localizer.localeMap.page.edit.detailContent}
          variant="outlined"
          value={contentValue}
          onChange={handleContentChange}
          fullWidth
          color="secondary"
          multiline />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default EditCastAccordion;
