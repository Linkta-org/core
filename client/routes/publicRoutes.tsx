import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage from '@features/home-page/HomePage';
import authRoutes from '@routes/authRoutes';
/**
 * Array of RouteObject for public access within the application.
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  ...authRoutes,
];

export default publicRoutes;
