import React from 'react';
import type { RouteObject } from 'react-router-dom';
import SignInPage from '@features/auth-pages/SignInPage';
import SignUpPage from '@features/auth-pages/SignUpPage';
import ForgotPasswordPage from '@features/auth-pages/ForgotPasswordPage';
import PasswordUpdatePage from '@features/auth-pages/PasswordUpdatePage';
import HomePage from '@features/home-page/HomePage';

//TODO: replace palceholders with components when ready
const unprotectedRoutes: RouteObject[] = [
  { path: 'userLogin', element: <SignInPage /> },
  { path: 'userSignup', element: <SignUpPage /> },
  { path: 'forgotPassword', element: <ForgotPasswordPage /> },
  { path: 'updatePassword', element: <PasswordUpdatePage /> },
  { path: 'home-page', element: <HomePage /> },
];

export default unprotectedRoutes;
