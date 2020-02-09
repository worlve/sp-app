import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import documentTitleBuilder from '../../../utils/DocumentTitleBuilder';
import localizer from '../../../utils/Localizer';

export interface NodesViewProps {}

const NodesView = (props: NodesViewProps) => {
  useEffect(() => {
    document.title = documentTitleBuilder.buildTitle([localizer.localeMap.routes.pages]);
  });

  return (
    <div className="NodesView">
      <h1>Pages</h1>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default NodesView;
