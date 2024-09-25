import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import UserInputView from '@components/user-input/UserInputView';
import OutputVisualizationPage from '@features/output-visualization-page/OutputVisualizationPage';
import HelpAndFeedback from '@features/help-and-feedback-page/HelpAndFeedbackPage';
import Settings from '@features/settings-page/Settings';
import BackOffice from '@features/auth-pages/BackOffice';
/**
 * Array of RouteObject for protected routes, accessible only after authentication.
 * It uses a ProtectedRoute component to guard access.
 */
const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: 'generate', element: <UserInputView /> },
      { path: 'output/:userInputId', element: <OutputVisualizationPage /> },
      { path: 'help', element: <HelpAndFeedback /> },
      { path: 'settings', element: <Settings /> },
      { path: 'back-office', element: <BackOffice /> },
    ],
  },
];

export default privateRoutes;
