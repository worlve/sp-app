import React, { FunctionComponent, ReactElement } from 'react';
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import localizer from '../../../../utils/Localizer';

export interface EditCastPageOverviewProps {
  title?: string;
  summary?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    widthController: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(3),
      maxWidth: 400,
      '&:first-child': {
        marginTop: 0,
      },
    },
  }),
);

const EditCastPageOverview: FunctionComponent<EditCastPageOverviewProps> = (props):ReactElement => {
  const classes = useStyles();
  const [titleValue, setTitleValue] = React.useState(props.title);
  const [summaryValue, setSummaryValue] = React.useState(props.summary);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryValue(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <div className={classes.widthController}>
        <TextField
          label={localizer.localeMap.page.edit.pageTitle}
          variant="outlined"
          value={titleValue}
          onChange={handleTitleChange}
          color="secondary"
          fullWidth />
      </div>
      <div className={classes.widthController}>
        <TextField
          label={localizer.localeMap.page.edit.pageSummary}
          variant="outlined"
          value={summaryValue}
          onChange={handleSummaryChange}
          fullWidth
          rowsMax="4"
          color="secondary"
          multiline />
      </div>
    </form>
  );
}

export default EditCastPageOverview;
