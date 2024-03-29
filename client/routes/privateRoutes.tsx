import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PromptInputPage from '@/client/features/prompt-input-page/PromptInputPage';
import OutputVisualizationPage from '@/client/features/output-visualization-page/OutputVisualizationPage';
/**
 * Array of RouteObject for protected routes, accessible only after authentication.
 * It uses a ProtectedRoute component to guard access.
 */
const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: 'generate', element: <PromptInputPage /> },
      { path: 'output', element: <OutputVisualizationPage /> },
    ],
  },
];

export default privateRoutes;
