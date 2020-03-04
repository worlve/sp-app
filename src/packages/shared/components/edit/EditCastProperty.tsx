import React, { FunctionComponent, ReactElement } from 'react';
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import localizer from '../../../../utils/Localizer';

export interface EditCastPropertyProps {
  propertyKey: string;
  value?: string | number | undefined;
  editing?: boolean;
  onValueChange?: (newValue: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textFieldSpacing: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  }),
);

const EditCastProperty: FunctionComponent<EditCastPropertyProps> = (props):ReactElement => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.onValueChange) {
      props.onValueChange(event.target.value);
    }
  };

  return (
    <form noValidate autoComplete="off">
      <div className={classes.textFieldSpacing}>
        <TextField
          label={localizer.localeMap.page.edit.propertyValue}
          variant="outlined"
          value={value}
          onChange={handleValueChange}
          color="secondary" />
      </div>
    </form>
  );
}

export default EditCastProperty;
