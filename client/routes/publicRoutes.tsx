import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '@features/home-page/HomePage';
import SignInPage from '@features/auth-pages/SignInPage';
import SignUpPage from '@features/auth-pages/SignUpPage';
import ForgotPasswordPage from '@features/auth-pages/ForgotPasswordPage';
import PasswordUpdatePage from '@features/auth-pages/PasswordUpdatePage';

/**
 * Array of RouteObject for public access within the application.
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: 'login', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgot-password', element: <ForgotPasswordPage /> },
  { path: 'reset-password', element: <PasswordUpdatePage /> },
];

export default publicRoutes;
