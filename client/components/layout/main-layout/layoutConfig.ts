import type { Tab } from '@/client/types/layout';
/**
 * Tab objects representing different routes.
 */
const homeTab = { tabname: 'Home', path: '/' };
const signInTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpTab = { tabname: 'Sign Up', path: '/sign-up' };
const buildTreeTab = { tabname: 'Build Your Tree', path: '/generate' };
const visualizeTab = { tabname: 'Visualize', path: '/output' };
/**
 * Object mapping routes to their corresponding navigation tabs.
 * Each key represents a route, and the value is an array of Tab objects.
 */
export const topNavigationTabsByRoute: Record<string, Tab[]> = {
  '/': [signInTab, signUpTab, buildTreeTab],
  '/generate': [homeTab, visualizeTab],
  '/output': [homeTab, buildTreeTab],
};
/**
 * Maps application routes to footer visibility flags, indicating whether the footer should be displayed on a given route.
 */
export const routeToFooterVisibilityMapping = {
  '/': true,
};
