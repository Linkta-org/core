import React, { useEffect, useState } from 'react';
// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback } from 'react';
import type {
  Edge,
  Node,
  EdgeChange,
  NodeChange,
  Connection,
  Viewport,
  OnMoveEnd,
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
    setCurrentViewport,
  } = useLinktaFlowStore();
  const { x, y, zoom } = useViewport();

  const nodesFromFlow = currentLinktaFlow?.nodes || initialNodes;
  const edgesFromFlow = currentLinktaFlow?.edges || initialEdges;
  const [nodes, setNodes] = useState<Node[]>(nodesFromFlow);
  const [edges, setEdges] = useState<Edge[]>(edgesFromFlow);

  const viewport = { x, y, zoom };
  console.log('nodes:', nodes);
  console.log('edges:', edges);
  console.log('viewport', viewport);


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
    setCurrentNodes(nodes);
  }, [setCurrentNodes, nodes]);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      //setCurrentEdges(updateEdge(oldEdge, newConnection, edges)),
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(() => {
    console.log('onEdgeUpdateEnd called');
    setCurrentEdges(edges);
  }, [setCurrentEdges, edges]);

  //When the user drags an edge, this event fires
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onMoveEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => {
      console.log('onMoveEnd', data);
      setCurrentViewport(data);
    },
    [setCurrentViewport]
  );

  //When a connection line is completed and two nodes are connected by the user, this event fires with the new connection.
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge(
        { ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } },
        edges
      );
      setEdges(newEdge);
      setCurrentEdges(newEdge);
    },
    [edges, setCurrentEdges]
  );

  useEffect(() => {
    setNodes(nodesFromFlow);
    setEdges(edgesFromFlow);
  }, [nodesFromFlow, edgesFromFlow]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onNodeDragStop={onNodeDragStop}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
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
