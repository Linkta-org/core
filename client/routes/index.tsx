import React from 'react';
import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/client/features/not-found-page/NotFoundPage';
import MainLayout from '../components/layout/main-layout/MainLayout';

/**
 * createBrowserRouter takes in an array of objects (in this case, a combined array of our routes) to
 * create a router object that handles all routing logic for our app.
 *
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [...publicRoutes, ...privateRoutes],
  },
  // here we implement a catch-all route handler that renders the NotFoundPage component for unknown routes
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
