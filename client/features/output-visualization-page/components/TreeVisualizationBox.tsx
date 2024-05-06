import React from 'react';
import TreeFlow from './Flow';
import { ReactFlowProvider } from 'reactflow';

const TreeVisualizationBox = () => {
  return (
    <div className="h-screen w-full border-2 border-red-700">
      <ReactFlowProvider>
        <TreeFlow />
      </ReactFlowProvider>
    </div>
  );
};

export default TreeVisualizationBox;
