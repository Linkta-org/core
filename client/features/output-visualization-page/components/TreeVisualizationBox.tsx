import React, { useState, useCallback } from 'react';
import type { EdgeChange, NodeChange, Edge, Node, Connection } from 'reactflow';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  ConnectionMode,
  updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LinktaFlowEdge from './LinktaFlowEdge';
import LinktaFlowNode from './LinktaFlowNode';
import ConnectionLine from './ConnectionLine';

const initialNodes = [
  {
    id: '1',
    label: '1',
    position: { x: 0, y: 0 },
    data: { label: 'drag me around 😎' },
    type: 'custom',
  },
  {
    id: '2',
    label: '2',
    position: { x: 0, y: 150 },
    data: { label: '...or me' },
    type: 'custom',
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'c',
    targetHandle: 'a',
    type: 'floating',
    markerEnd: { type: MarkerType.Arrow },
  },
];

const nodeTypes = {
  linktaNode: LinktaFlowNode,
};

const edgeTypes = {
  linktaEdge: LinktaFlowEdge,
};

function LinktaFlowVisualizationBox() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    []
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        fitView
        connectionMode={ConnectionMode.Loose}
        connectionLineComponent={ConnectionLine}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default LinktaFlowVisualizationBox;
