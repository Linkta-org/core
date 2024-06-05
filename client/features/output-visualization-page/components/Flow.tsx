// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { LinktaNode } from './LinktaNode';

import React from 'react';

const rfStyle = {
  backgroundColor: '#173336',
  height: '100%', // Ensure the ReactFlow component takes up full height
  width: '100%', // Ensure the ReactFlow component takes up full width
};

const initialNodes = [
  {
    id: 'node-1',
    type: 'linktaNode',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { linktaNode: LinktaNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
