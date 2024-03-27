import React from 'react';
import type { RouteObject } from 'react-router-dom';
/**
 * The publicRoutes variable is an array which contains objects that each represent a route.
 * Our path property is set to the default route. Setting the element property to the MainLayout
 * component at the top level will allow its children to render MainLayout.
 *
 */
const publicRoutes: RouteObject[] = [
  { index: true, element: <>HomePage placeholder</> },
  { path: 'sign-in', element: <>SignInPage placeholder</> },
  { path: 'sign-in', element: <>SignUpPage placeholder</> },
];

export default publicRoutes;
