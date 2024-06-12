import React, { useEffect } from 'react';
// we define the nodeTypes outside of the component to prevent re-renderings
import { useCallback, useState } from 'react';
import type { Edge, Node, EdgeChange, NodeChange, Connection } from 'reactflow';
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
import undoRedoStore from '@/client/stores/undoRedoStore';

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

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { setCurrentFlow } = undoRedoStore();

  useEffect(() => {
    const flow = { nodes, edges };
    setCurrentFlow(flow);
  }, [nodes, edges, setCurrentFlow]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      console.log('onNodesChange is getting called', changes);
      setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
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
      style={rfStyle}
    >
      <Background />
      <Controls position="bottom-right" />
      <Panel
        position="bottom-right"
        style={{ bottom: 120 }}
      >
        <UndoAndRedo />
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
