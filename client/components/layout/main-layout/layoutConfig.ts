import type { Tab } from '@/client/types/layout';
/**
 * Tab objects representing different routes.
 */
const homePageRouteTab = { tabname: 'Home', path: '/' };
const signInPageRouteTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpPageRouteTab = { tabname: 'Sign Up', path: '/sign-up' };
const buildTreePageRouteTab = { tabname: 'Build Your Tree', path: '/generate' };
const visualizePageRouteTab = { tabname: 'Visualize', path: '/output' };
/**
 * Object mapping routes to their corresponding navigation tabs.
 * Each key represents a route, and the value is an array of Tab objects.
 */
export const routeToNavTabsMapping: Record<string, Tab[]> = {
  '/': [signInPageRouteTab, signUpPageRouteTab, buildTreePageRouteTab],
  '/generate': [homePageRouteTab, visualizePageRouteTab],
  '/output': [homePageRouteTab, buildTreePageRouteTab],
};
