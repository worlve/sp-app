import React from 'react';
import NodeView from '../packages/node/components/NodeView';
import NodesView from '../packages/node/components/NodesView';
import { useParams } from 'react-router-dom';

const NodeRoute = () => {
  const { nodeId } = useParams();
  if (!nodeId) {
    return (
      <NodesView></NodesView>
    );
  }
  return (
    <NodeView nodeId={nodeId}></NodeView>
  );
}

export default NodeRoute;
