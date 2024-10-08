import React, { useState, useCallback, useEffect } from 'react';
import type {
  EdgeChange,
  NodeChange,
  Edge,
  Node,
  Connection,
  NodeDragHandler,
} from 'reactflow';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LinktaFlowEdge from '@features/output-visualization-page/components/LinktaFlowEdge';
import LinktaNode from '@features/output-visualization-page/components/LinktaNode';
import ConnectionLine from '@features/output-visualization-page/components/ConnectionLine';
import useFetchLinktaFlow from '@hooks/useFetchLinktaFlow';
import useLinktaFlowStore from '@stores/LinktaFlowStore';
import dagreAutoLayout from '@/utils/dagreAutoLayout';
import Loader from '@/components/common/Loader';
import UndoAndRedo from '@features/output-visualization-page/components/UndoAndRedo';

// Finds the nearest node to the dragged node within a 100-unit distance.
const findNearbyNode = (draggedNode: Node, nodes: Node[]) => {
  const { x, y } = draggedNode.position;

  return nodes.find((node) => {
    const distance = Math.sqrt(
      Math.pow(node.position.x - x, 2) + Math.pow(node.position.y - y, 2),
    );
    return distance < 100 && node.id !== draggedNode.id;
  });
};

// Removes the original parent edge of the dragged node by filtering out the edge
const removeOriginalParentEdge = (
  draggedNodeId: string,
  edges: Edge[],
): Edge[] => {
  return edges.filter((edge) => edge.target !== draggedNodeId);
};

// Creates a new edge between two nodes
const createNewEdge = (sourceNodeId: string, targetNodeId: string): Edge => ({
  id: `e${sourceNodeId}-${targetNodeId}`,
  source: sourceNodeId,
  target: targetNodeId,
  markerEnd: { type: MarkerType.Arrow },
});

// Styling for the ReactFlow component
const rfStyle = {
  backgroundColor: 'hsla(186, 40%, 15%, 0.4)',
  height: '100%',
  width: '100%',
};

const nodeTypes = { linktaNode: LinktaNode };
const edgeTypes = { linktaEdge: LinktaFlowEdge };

function Flow({ userInputId }: { userInputId: string }) {
  const {
    currentLinktaFlow,
    setCurrentFlow,
    setCurrentEdges,
    setCurrentNodes,
  } = useLinktaFlowStore();
  const { data: linktaFlow, fetchStatus } = useFetchLinktaFlow(userInputId);

  const nodesFromFlow = currentLinktaFlow?.nodes || [];
  const edgesFromFlow = currentLinktaFlow?.edges || [];

  const [nodes, setNodes] = useState<Node[]>(nodesFromFlow);
  const [edges, setEdges] = useState<Edge[]>(edgesFromFlow);
  const [tempEdge, setTempEdge] = useState<Edge | null>(null);

  // If a temporary edge exists, exclude the original edge connected to the dragged node
  const displayedEdges = tempEdge
    ? edges.filter((edge) => edge.target !== tempEdge.target)
    : edges;

  // Fetch and set the flow layout and nodes/edges when linktaFlow is updated
  useEffect(() => {
    if (linktaFlow) {
      const { nodes: layoutNodes, edges: layoutEdges } = dagreAutoLayout(
        linktaFlow.nodes,
        linktaFlow.edges,
      );

      const styledNodes = layoutNodes.map((node) => ({
        ...node,
        type: 'linktaNode',
      }));

      const styledEdges = layoutEdges.map((edge) => ({
        ...edge,
        markerEnd: { type: MarkerType.Arrow },
      }));

      setNodes(styledNodes);
      setEdges(styledEdges);
      setCurrentFlow({
        id: linktaFlow.id,
        nodes: styledNodes,
        edges: styledEdges,
      });
    }
  }, [linktaFlow, setCurrentFlow]);

  // Handle node changes
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Handle edge changes
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Handles the dragging of a node, showing a temporary edge to a nearby node (if found)
  const onNodeDrag: NodeDragHandler = useCallback(
    (_event, draggedNode) => {
      const nearbyNode = findNearbyNode(draggedNode, nodes);

      if (nearbyNode) {
        setTempEdge({
          id: `temp-e${nearbyNode.id}-${draggedNode.id}`,
          source: nearbyNode.id,
          target: draggedNode.id,
          style: { stroke: '#d3d3d3', strokeDasharray: '5 5' },
          type: 'floating',
          markerEnd: { type: MarkerType.Arrow },
        });
      } else {
        setTempEdge(null); // No nearby node, clear temporary edge
      }
    },
    [nodes],
  );

  // Handle node drag stop to finalize edge and remove original parent edge
  const onNodeDragStop: NodeDragHandler = useCallback(
    (_event, draggedNode) => {
      const nearbyNode = findNearbyNode(draggedNode, nodes);

      if (nearbyNode) {
        const newEdge = createNewEdge(nearbyNode.id, draggedNode.id);

        // Update the edges by removing the original parent edge and adding the new edge
        const updatedEdges = addEdge(
          newEdge,
          removeOriginalParentEdge(draggedNode.id, edges),
        );

        setEdges(updatedEdges);
        setCurrentEdges(updatedEdges);
      }

      setTempEdge(null);
      setCurrentNodes(nodes);
    },
    [nodes, edges, setEdges, setCurrentEdges, setCurrentNodes],
  );

  // Handles connecting two nodes by creating a new edge between them
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge(
        { ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } },
        edges,
      );
      setEdges(newEdge);
      setCurrentEdges(newEdge);
    },
    [edges, setCurrentEdges],
  );

  // Update nodes and edges when the flow data changes
  useEffect(() => {
    setNodes(nodesFromFlow);
    setEdges(edgesFromFlow);
  }, [nodesFromFlow, edgesFromFlow]);

  return (
    <>
      {fetchStatus === 'fetching' ? (
        <Loader />
      ) : (
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          edges={tempEdge ? [...displayedEdges, tempEdge] : edges} // If tempEdge exists, show it with displayedEdges, else show all edges
          onEdgesChange={onEdgesChange}
          edgeTypes={edgeTypes}
          onConnect={onConnect}
          fitView
          connectionMode={ConnectionMode.Loose}
          connectionLineComponent={ConnectionLine}
          style={rfStyle}
        >
          <Background />
          <Controls position='bottom-left' />
          <Panel
            position='bottom-left'
            style={{ bottom: 120 }}
          >
            <UndoAndRedo />
          </Panel>
        </ReactFlow>
      )}
    </>
  );
}

export default Flow;
