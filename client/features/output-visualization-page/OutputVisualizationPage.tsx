import React from 'react';
import Flow from '@features/output-visualization-page/components/Flow';
import { ReactFlowProvider } from 'reactflow';
import { useParams } from 'react-router-dom';

const OutputVisualizationPage = () => {
  const { userInputId } = useParams<{ userInputId: string }>();

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlowProvider>
          <Flow userInputId={userInputId!} />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OutputVisualizationPage;
