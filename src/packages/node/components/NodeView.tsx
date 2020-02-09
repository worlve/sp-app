import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import documentTitleBuilder from '../../../utils/DocumentTitleBuilder';

export interface NodeViewProps { 
  nodeId: string; 
}

const NodeView = (props: NodeViewProps) => {
  useEffect(() => {
    document.title = documentTitleBuilder.buildTitle([props.nodeId]);
  });

  return (
    <div className="NodeView">
      <h1>Page: {props.nodeId}</h1>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default NodeView;
