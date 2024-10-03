import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '@features/home-page/HomePage';
import SignInPage from '@features/auth-pages/SignInPage';
import SignUpPage from '@features/auth-pages/SignUpPage';
import ForgotPasswordPage from '@features/auth-pages/ForgotPasswordPage';
import PasswordUpdatePage from '@features/auth-pages/PasswordUpdatePage';
import TermsOfService from '@features/terms-of-service/TermsOfService';
import PrivacyPolicy from '@features/privacy-policy/PrivacyPolicy';

/**
 * Array of RouteObject for public access within the application.
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: 'home-page', element: <HomePage /> },
  { path: 'login', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgotten', element: <ForgotPasswordPage /> },
  { path: 'update-password', element: <PasswordUpdatePage /> },
  { path: 'privacy-policy', element: <PrivacyPolicy /> },
  { path: 'terms-of-service', element: <TermsOfService /> },
];

export default publicRoutes;
