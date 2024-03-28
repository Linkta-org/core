import React from 'react';
import type { RouteObject } from 'react-router-dom';
//TODO: replace palceholders with components when ready
const authRoutes: RouteObject[] = [
  { path: 'sign-in', element: <>SignInPage placeholder</> },
  { path: 'sign-up', element: <>SignUpPage placeholder</> },
  { path: 'forgot-pwd', element: <>ForgotPasswordPage placeholder</> },
  { path: 'reset-pwd', element: <>PasswordResetPage placeholder</> },
];

export default authRoutes;
