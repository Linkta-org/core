import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HelpAndFeedback from '@/client/features/help-and-feedback-page/HelpAndFeedbackPage';
import Settings from '@/client/features/settings-page/Settings';
import SignInPage from '@/client/features/auth-pages/SignInPage';
import SignUpPage from '@/client/features/auth-pages/SignUpPage';
import ForgotPasswordPage from '@/client/features/auth-pages/ForgotPasswordPage';
import PasswordResetPage from '@/client/features/auth-pages/PasswordResetPage';

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
