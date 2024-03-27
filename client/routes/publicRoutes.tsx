import React from 'react';
import type { RouteObject } from 'react-router-dom';
/**
 * Array of RouteObject for public access within the application.
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <>HomePage placeholder</> },
  { path: 'sign-in', element: <>SignInPage placeholder</> },
  { path: 'sign-in', element: <>SignUpPage placeholder</> },
];

export default publicRoutes;
