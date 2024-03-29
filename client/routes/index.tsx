import React from 'react';
import publicRoutes from './public-routes/publicRoutes';
import privateRoutes from './privateRoutes';
import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/client/features/not-found-page/NotFoundPage';
import MainLayout from '@/client/components/layout/main-layout/MainLayout';
import ErrorPage from '@/client/features/error-pages/ErrorPage';
/**
 * Initializes the application's router using createBrowserRouter, combining various routes under MainLayout for a unified layout. It includes:
 * - Root path '/' for MainLayout with nested public, private routes, and catch-all '*' path directing to NotFoundPage for undefined routes.
 * - errorElement is defined to render the ErrorPage component in the event of routing errors
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
    errorElement: <ErrorPage />,
  },
] as RouteObject[]);

export default router;
