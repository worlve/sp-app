import { Node } from "../entities/node";

export class NodeService {
  static async fetchNode(nodeId: string):Promise<Node> {
    return new Node(nodeId, "test");
  }
}