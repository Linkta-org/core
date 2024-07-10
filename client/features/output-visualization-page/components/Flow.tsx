import React, { useState, useCallback, useEffect } from 'react';
import type { EdgeChange, NodeChange, Edge, Node, Connection, Viewport } from 'reactflow';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  ConnectionMode,
  updateEdge,
  Panel,
  useViewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LinktaFlowEdge from '@features/output-visualization-page/components/LinktaFlowEdge';
import LinktaNode from '@features/output-visualization-page/components/LinktaNode';
import ConnectionLine from '@features/output-visualization-page/components/ConnectionLine';
import useLinktaFlowStore from '@stores/LinktaFlowStore';
import UndoAndRedo from '@features/output-visualization-page/components/UndoAndRedo';

const nodeTypes = { linktaNode: LinktaNode };
const edgeTypes = { linktaEdge: LinktaFlowEdge };

const rfStyle = {
  backgroundColor: '#173336',
  height: '100%',
  width: '100%',
};

const initialNodes = [
  {
    id: '1',
    label: '1',
    position: { x: 0, y: 0 },
    data: { label: '😎 drag me around 😎' },
    type: 'linktaNode',
  },
  {
    id: '2',
    label: '2',
    position: { x: 0, y: 150 },
    data: { label: '...or me' },
    type: 'linktaNode',
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'c',
    targetHandle: 'a',
    type: 'linktaEdge',
    markerEnd: { type: MarkerType.Arrow },
  },
];

function Flow({ userInputId }: { userInputId: string }) {
  const {
    currentLinktaFlow,
    setCurrentFlow,
    setCurrentEdges,
    setCurrentNodes,
    setCurrentViewport,
  } = useLinktaFlowStore();
  const { x, y, zoom } = useViewport();

  const nodesFromFlow = currentLinktaFlow?.nodes || initialNodes;
  const edgesFromFlow = currentLinktaFlow?.edges || initialEdges;

  const [nodes, setNodes] = useState<Node[]>(nodesFromFlow);
  const [edges, setEdges] = useState<Edge[]>(edgesFromFlow);

  const viewport = { x, y, zoom };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onNodeDragStop = useCallback(() => {
    setCurrentNodes(nodes);
  }, [setCurrentNodes, nodes]);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
      setCurrentEdges(updateEdge(oldEdge, newConnection, edges));
    },
    [setCurrentEdges, edges],
  );

  const onEdgeUpdateEnd = useCallback(() => {
    setCurrentEdges(edges);
  }, [setCurrentEdges, edges]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onMoveEnd = useCallback(
    (_event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element> | null, data: Viewport) => {
      setCurrentViewport(data);
    },
    [setCurrentViewport],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, edges);
      setEdges(newEdge);
      setCurrentEdges(newEdge);
    },
    [edges, setCurrentEdges],
  );

  useEffect(() => {
    setNodes(nodesFromFlow);
    setEdges(edgesFromFlow);
  }, [nodesFromFlow, edgesFromFlow]);

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      edges={edges}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      fitView
      connectionMode={ConnectionMode.Loose}
      connectionLineComponent={ConnectionLine}
      style={rfStyle}
      onMoveEnd={onMoveEnd}
      viewport={viewport}
    >
      <Background />
      <Controls position="bottom-left" />
      <Panel position="bottom-left" style={{ bottom: 120 }}>
        <UndoAndRedo />
      </Panel>
    </ReactFlow>
  );
}

export default Flow;