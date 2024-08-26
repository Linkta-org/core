import React, { useState, useCallback, useEffect } from 'react';
import type { EdgeChange, NodeChange, Edge, Node, Connection } from 'reactflow';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  ConnectionMode,
  reconnectEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LinktaFlowEdge from '@features/output-visualization-page/components/LinktaFlowEdge';
import LinktaNode from '@features/output-visualization-page/components/LinktaNode';
import ConnectionLine from '@features/output-visualization-page/components/ConnectionLine';
import useFetchLinktaFlow from '@hooks/useFetchLinktaFlow';
import useLinktaFlowStore from '@stores/LinktaFlowStore';
import dagreAutoLayout from '@/utils/dagreAutoLayout';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/common/Loader';
import UndoAndRedo from '@features/output-visualization-page/components/UndoAndRedo';

const nodeTypes = { linktaNode: LinktaNode };
const edgeTypes = { linktaEdge: LinktaFlowEdge };

const rfStyle = {
  backgroundColor: 'hsla(186, 40%, 15%, 0.4)',
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
  } = useLinktaFlowStore();
  const {
    data: linktaFlow,
    isLoading,
    isError,
  } = useFetchLinktaFlow(userInputId);

  const nodesFromFlow = currentLinktaFlow?.nodes || initialNodes;
  const edgesFromFlow = currentLinktaFlow?.edges || initialEdges;

  const [nodes, setNodes] = useState<Node[]>(nodesFromFlow);
  const [edges, setEdges] = useState<Edge[]>(edgesFromFlow);
  const navigate = useNavigate();

  useEffect(() => {
    if (linktaFlow) {
      const { nodes: layoutNodes, edges: layoutEdges } = dagreAutoLayout(
        linktaFlow.nodes,
        linktaFlow.edges,
      );

      setNodes(layoutNodes);
      setEdges(layoutEdges);
      setCurrentFlow({
        id: linktaFlow.id,
        nodes: layoutNodes,
        edges: layoutEdges,
      });
    }
  }, [linktaFlow, setCurrentFlow]);

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
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
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

  useEffect(() => {
    setNodes(nodesFromFlow);
    setEdges(edgesFromFlow);
  }, [nodesFromFlow, edgesFromFlow]);

  if (isLoading) {
    return <Loader />;
  }

  //TODO: implement better error handling
  if (isError) {
    navigate('/generate');
  }

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
  );
}

export default Flow;
