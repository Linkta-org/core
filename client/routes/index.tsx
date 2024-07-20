import React from 'react';
import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import UnauthorizedLayout from '@features/auth-pages/UnauthorizedLayout';
import NotFoundPage from '@features/error-pages/NotFoundPage';
import ErrorPage from '@features/error-pages/ErrorPage';
import MainLayout from '@components/layout/MainLayout';
import privateRoutes from '@routes/privateRoutes';
import publicRoutes from '@routes/publicRoutes';
import useAuth from '@hooks/useAuth';

/**
 * Initializes the application's router using createBrowserRouter, combining various routes under one of two static layouts.
 * It includes:
 * - Root path '/' for static layout with nested public, private routes, and catch-all '*' path directing to NotFoundPage for undefined routes.
 * - errorElement is defined to render the ErrorPage component in the event of routing errors
 * - errorElement does not directly support dynamic inline re-rendering and must hav its own ternary to apply layouts
 * - the two static layouts are: MainLayout for logged in users / UnauthorizedLayout for logged out users
 */
const IndexRouter = () => {
  const { isAuthenticated } = useAuth();

  return createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <MainLayout /> : <UnauthorizedLayout />,
      children: [
        ...publicRoutes,
        ...privateRoutes,
        { path: '*', element: <NotFoundPage /> },
      ] as RouteObject[],
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
  ] as RouteObject[]);
};

export default IndexRouter;
