import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HelpAndFeedback from '@features/help-and-feedback-page/HelpAndFeedbackPage';
import Settings from '@features/settings-page/Settings';
import SignInPage from '@features/auth-pages/SignInPage';
import SignUpPage from '@features/auth-pages/SignUpPage';
import ForgotPasswordPage from '@features/auth-pages/ForgotPasswordPage';
import PasswordResetPage from '@features/auth-pages/PasswordResetPage';

//TODO: replace palceholders with components when ready
const authRoutes: RouteObject[] = [
  { path: 'sign-in', element: <SignInPage /> },
  { path: 'sign-up', element: <SignUpPage /> },
  { path: 'forgot-pwd', element: <ForgotPasswordPage /> },
  { path: 'reset-pwd', element: <PasswordResetPage /> },
  { path: 'help-and-feedback', element: <HelpAndFeedback /> },
  { path: 'settings', element: <Settings /> },
];

export default authRoutes;
