import React from 'react';
import Button from '@material-ui/core/Button';
import documentTitleBuilder from '../../../utils/DocumentTitleBuilder';
import { Node } from '../entities/node';
import { NodeService } from '../services/NodeService';

export interface NodeViewProps { 
  nodeId: string; 
}

interface NodeState {
  node?: Node;
}

class NodeView extends React.Component<NodeViewProps, NodeState> {
  constructor(props: NodeViewProps) {
    super(props);
    this.state = {
      node: new Node(this.props.nodeId, "test")
    };
  }

  componentDidMount() {
    const callback = NodeView.setDocumentTitle;

    this.setNode(callback);
  }

  private async setNode(callback?: (node: Node) => void) {
    const node = await NodeService.fetchNode(this.props.nodeId);
    if (callback) {
      callback(node);
    }
    this.setState({
      node
    });
  }

  private static setDocumentTitle(node: Node) {
    document.title = documentTitleBuilder.buildTitle([node.name]);
  }

  render() {
    if (!this.state.node) {
      return (
        <div className="NodeView">Loadings...</div>
      );
    }
    return (
      <div className="NodeView">
        <h1>Page: {this.state.node.name}</h1>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default NodeView;
