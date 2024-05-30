import HelpAndFeedback from '@/client/features/help-and-feedback-page/HelpAndFeedbackPage';
import Settings from '@/client/features/settings-page/Settings';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
//TODO: replace palceholders with components when ready
const authRoutes: RouteObject[] = [
  { path: 'sign-in', element: <>SignInPage placeholder</> },
  { path: 'sign-up', element: <>SignUpPage placeholder</> },
  { path: 'forgot-pwd', element: <>ForgotPasswordPage placeholder</> },
  { path: 'reset-pwd', element: <>PasswordResetPage placeholder</> },
  { path: 'help-and-feedback', element: <HelpAndFeedback /> },
  { path: 'settings', element: <Settings /> },
];

export default authRoutes;
