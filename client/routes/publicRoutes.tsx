import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '../features/home-page/HomePage';
/**
 * Array of RouteObject for public access within the application.
 */
//TODO: replace palceholders with components when ready
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: 'sign-in', element: <>SignInPage placeholder</> },
  { path: 'sign-up', element: <>SignUpPage placeholder</> },
];

export default publicRoutes;
