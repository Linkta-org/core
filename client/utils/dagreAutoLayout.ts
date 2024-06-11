import dagre from '@dagrejs/dagre';
// Placeholder for initial nodes and edges types
import type { Node, Edge } from 'reactflow';
import {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  ADJUST_PARAMS_NODES_WITH_PARENT_ID,
} from '@client/utils/constants';
const setupDagreFlow = () => {
  const dagreFlow = new dagre.graphlib.Graph();
  dagreFlow.setDefaultEdgeLabel(() => ({}));
  dagreFlow.setGraph({ rankdir: 'TB' });
  return dagreFlow;
};

function dagreAutoLayout(initialNodes: Node[], initialEdges: Edge[]) {
  const dagreGraph = setupDagreFlow();

  initialNodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: DEFAULT_NODE_WIDTH,
      height: DEFAULT_NODE_HEIGHT,
    });
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  //already spreaded out the nodes
  dagre.layout(dagreGraph);

  initialNodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    if (node.parentId) {
      const parentNodeWithPosition = dagreGraph.node(node.parentId);
      node.position = {
        x:
          nodeWithPosition.x -
          parentNodeWithPosition.x +
          parentNodeWithPosition.width -
          DEFAULT_NODE_WIDTH * ADJUST_PARAMS_NODES_WITH_PARENT_ID,
        y: nodeWithPosition.y - parentNodeWithPosition.y,
      };
    } else {
      node.position = {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      };
    }
  });

  return { nodes: initialNodes, edges: initialEdges };
}

export default dagreAutoLayout;
