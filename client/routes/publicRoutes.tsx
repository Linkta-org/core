import React from 'react';
import MainLayout from '../components/layout/main-layout/MainLayout';
import PromptInputPage from '../features/prompt-input-page/PromptInputPage';
import OutputVisualizationPage from '../features/output-visualization-page/OutputVisualizationPage';
import type { RouteObject } from 'react-router-dom';
import NotFoundPage from '../features/not-found-page/NotFoundPage';

/**
 * The publicRoutes variable is an array which contains objects that each represent a route.
 * Our path property is set to the default route. Setting the element property to the MainLayout
 * component at the top level will allow its children to render MainLayout.
 *
 */

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/generate', element: <PromptInputPage /> },
      { path: '/output', element: <OutputVisualizationPage /> },
    ],
  },
  // here we implement a catch-all route handler that renders the NotFoundPage component for unknown routes
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default publicRoutes;
