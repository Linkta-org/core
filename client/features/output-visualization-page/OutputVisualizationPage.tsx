import React from 'react';
import Flow from '@features/output-visualization-page/components/Flow';
import { ReactFlowProvider } from 'reactflow';
import { useParams } from 'react-router-dom';
import Loader from '@/components/common/Loader';
import useLoadingStore from '@/stores/LoadingStore';

const OutputVisualizationPage = () => {
  const { userInputId } = useParams<{ userInputId: string }>();
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <ReactFlowProvider>
            <Flow userInputId={userInputId!} />
          </ReactFlowProvider>
        )}
      </div>
    </>
  );
};

export default OutputVisualizationPage;
