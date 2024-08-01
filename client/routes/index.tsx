// routes/index.ts
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import UnauthorizedLayout from '@features/auth-pages/UnauthorizedLayout';
import NotFoundPage from '@features/error-pages/NotFoundPage';
import ErrorPage from '@features/error-pages/ErrorPage';
import MainLayout from '@components/layout/MainLayout';
import privateRoutes from '@routes/privateRoutes';
import publicRoutes from '@routes/publicRoutes';
import useAuth from '@hooks/useAuth';
import React from 'react';

/**
 * Initializes the application's router using createBrowserRouter, combining various routes under one of two static layouts.
 * It includes:
 * - Root path '/' for static layout with nested public, private routes, and catch-all '*' path directing to NotFoundPage for undefined routes.
 * - errorElement is defined to render the ErrorPage component in the event of routing errors
 * - errorElement does not directly support dynamic inline re-rendering and must hav its own ternary to apply layouts
 * - the two static layouts are: MainLayout for logged in users / UnauthorizedLayout for logged out users
 */

const getRoutes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <UnauthorizedLayout />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
    errorElement: isAuthenticated ? (
      <MainLayout>
        <ErrorPage />
      </MainLayout>
    ) : (
      <UnauthorizedLayout>
        <ErrorPage />
      </UnauthorizedLayout>
    ),
  },
];

const createRouter = (isAuthenticated: boolean) =>
  createBrowserRouter(getRoutes(isAuthenticated));

const IndexRouter = () => {
  const { isAuthenticated } = useAuth();
  return createRouter(isAuthenticated);
};

export default IndexRouter;
export { createRouter, getRoutes };
