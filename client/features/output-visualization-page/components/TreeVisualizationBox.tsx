import React, { useState, useCallback } from 'react';
import type { Node, Edge, OnNodesChange, OnEdgesChange } from 'reactflow';
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * TreeVisualizationBox utilizes React Flow to render a tree of nodes connected by edges. We are using the event handlers onNodesChange and onEdgesChange to trigger state update when we drag and drop our nodes, while applyNodeChanges and applyEdgeChanges are responsible for updating state.
 * The Background component gives us our customizable grid where our tree is placed. The Controls component gives us a panel that contain buttons for functions such as zoom in/out.
 */

const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
  },
];

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Child 1' },
    position: { x: 100, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Parent' },
    position: { x: 0, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Child 2' },
    position: { x: 100, y: 250 },
  },
];

const TreeVisualizationBox: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((n) => applyNodeChanges(changes, n)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((e) => applyEdgeChanges(changes, e)),
    []
  );

  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualizationBox;
