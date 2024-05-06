import { useCallback, useRef } from 'react';

import ReactFlow, {
  Controls,
  NodeOrigin,
  Panel,
  OnConnectStart,
  OnConnectEnd,
  useStoreApi,
  useReactFlow,
  ConnectionLineType,
  ReactFlowProvider
} from 'reactflow';
import { shallow } from 'zustand/shallow';



export default function TreeFlow() {
  return (

    <ReactFlowProvider>
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
    </ReactFlow>
    </ReactFlowProvider>
  );
}
