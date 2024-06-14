import React, { useEffect } from 'react';
// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback } from 'react';
import type {
  Edge,
  Node,
  EdgeChange,
  NodeChange,
  Connection,
  Viewport,
} from 'reactflow';
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
  useOnViewportChange,
  useViewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LinktaFlowEdge from './LinktaFlowEdge';
import LinktaNode from './LinktaNode';
import ConnectionLine from './ConnectionLine';

const nodeTypes = { linktaNode: LinktaNode };

const edgeTypes = {
  linktaEdge: LinktaFlowEdge,
};
import UndoAndRedo from './UndoAndRedo';
import useLinktaFlowStore from '@/client/stores/LinktaFlowStore';
import { set } from 'mongoose';

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

function ViewportChangeLogger() {
  useOnViewportChange({
    onStart: (viewport: Viewport) => console.log('start', viewport),
    onChange: (viewport: Viewport) => console.log('change', viewport),
    onEnd: (viewport: Viewport) => console.log('end', viewport),
  });
  return null;
}

function Flow() {
  const {
    currentLinktaFlow,
    setCurrentFlow,
    setCurrentEdges,
    setCurrentNodes,
  } = useLinktaFlowStore();
  const { pause, resume } = useLinktaFlowStore.temporal.getState();
  const { x, y, zoom } = useViewport();

  const nodes = currentLinktaFlow?.nodes || initialNodes;
  const edges = currentLinktaFlow?.edges || initialEdges;

  const [, setNodes] = React.useState<Node[]>(nodes);
  const [, setEdges] = React.useState<Edge[]>(edges);
  console.log('nodes:', nodes);
  console.log('edges:', edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  ViewportChangeLogger();

  console.log('currentLinktaFlow:', currentLinktaFlow);

  const onNodeDragStop = useCallback(() => {
    console.log('onNodeDragStop called');
    setCurrentFlow({ nodes, edges });
  }, [setCurrentFlow, nodes, edges]);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      //setCurrentEdges(updateEdge(oldEdge, newConnection, edges)),
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  //When the user drags an edge, this event fires
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  //When a connection line is completed and two nodes are connected by the user, this event fires with the new connection.
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, edges);
      setEdges(newEdge);
      setCurrentEdges(newEdge);
    },
    [edges, setCurrentEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgeUpdate={onEdgeUpdate}
      onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      fitView
      connectionMode={ConnectionMode.Loose}
      connectionLineComponent={ConnectionLine}
      style={rfStyle}
    >
      <Background />
      <Controls position="bottom-left" />
      <Panel
        position="bottom-left"
        style={{ bottom: 120 }}
      >
        <UndoAndRedo />
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
