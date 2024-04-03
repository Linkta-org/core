import React from 'react';
import PromptInputPage from '@/client/features/prompt-input-page/PromptInputPage';
import TreeVisualizationBox from './components/TreeVisualizationBox';

const OutputVisualizationPage: React.FC = () => {
  return (
    <div>
      <PromptInputPage />
      <TreeVisualizationBox />
    </div>
  );
};

export default OutputVisualizationPage;
