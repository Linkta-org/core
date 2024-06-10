// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback, useState } from 'react';
import type { Edge, Node, EdgeChange, NodeChange, Connection } from 'reactflow';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { LinktaNode } from './LinktaNode';

import React from 'react';

const rfStyle = {
  backgroundColor: '#173336',
  height: '100%',
  width: '100%',
};

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'linktaNode',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

const nodeTypes = { linktaNode: LinktaNode };

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        edges={edges}
        fitView
        nodes={nodes}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        style={rfStyle}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
