import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '@features/home-page/HomePage';
import unprotectedRoutes from '@routes/unprotectedRoutes';
/**
 * Array of RouteObject for public access within the application.
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  ...unprotectedRoutes,
];

export default publicRoutes;
