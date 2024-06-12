import React from 'react';
import Flow from './components/Flow';
import { ReactFlowProvider } from 'reactflow';

const OutputVisualizationPage = () => {
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OutputVisualizationPage;
