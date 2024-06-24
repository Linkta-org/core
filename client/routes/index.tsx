import React from 'react';
import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import publicRoutes from '@routes/publicRoutes';
import privateRoutes from '@routes/privateRoutes';
import NotFoundPage from '@features/not-found-page/NotFoundPage';
import MainLayout from '@components/layout/MainLayout';
import ErrorPage from '@features/error-pages/ErrorPage';
import useAuth from '@hooks/useAuth';
import UnauthorizedLayout from '@features/auth-pages/UnauthorizedLayout';

const { isAuthenticated } = useAuth();
/**
 * Initializes the application's router using createBrowserRouter, combining various routes under MainLayout for a unified layout. It includes:
 * - Root path '/' for MainLayout with nested public, private routes, and catch-all '*' path directing to NotFoundPage for undefined routes.
 * - errorElement is defined to render the ErrorPage component in the event of routing errors
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <UnauthorizedLayout />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      { path: '*', element: <NotFoundPage /> },
    ] as RouteObject[],
    errorElement: <ErrorPage />,
  },
] as RouteObject[]);

export default router;
