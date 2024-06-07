// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback, useState } from 'react';
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

const initialNodes = [
  {
    id: 'node-1',
    type: 'linktaNode',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

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
