import React from 'react';
import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/client/features/not-found-page/NotFoundPage';
import MainLayout from '@/client/components/layout/main-layout/MainLayout';
/**
 * Configures the application's router with createBrowserRouter, combining various routes under MainLayout for a unified layout. It includes:
 * - Root path '/' for MainLayout with nested public and private routes.
 * - Catch-all '*' path directing to NotFoundPage for undefined routes.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      { path: '*', element: <NotFoundPage /> },
    ] as RouteObject[],
  },
] as RouteObject[]);

export default router;
