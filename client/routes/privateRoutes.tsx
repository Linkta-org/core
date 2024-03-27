import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PromptInputPage from '@/client/features/prompt-input-page/PromptInputPage';
import OutputVisualizationPage from '@/client/features/output-visualization-page/OutputVisualizationPage';

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { path: '/generate', element: <PromptInputPage /> },
      { path: '/output', element: <OutputVisualizationPage /> },
    ],
  },
];

export default privateRoutes;
