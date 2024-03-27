import type { Tab } from '@/client/types/layout';
/**
 * Tab objects representing different routes.
 */
const homePageRouteTab: Tab = { tabname: 'Home', path: '/' };
const signInPageRouteTab: Tab = { tabname: 'Sign In', path: '/sign-in' };
const signUpPageRouteTab: Tab = { tabname: 'Sign Up', path: '/sign-up' };
const buildTreePageRouteTab: Tab = {
  tabname: 'Build Your Tree',
  path: '/generate',
};
const visualizePageRouteTab: Tab = { tabname: 'Visualize', path: '/output' };
const cookiePreferencesTab: Tab = {
  tabname: 'Cookie Preferences',
  path: '/cookie_preferences',
};
const securityTab: Tab = { tabname: 'Security', path: '/security' };
const legalTab: Tab = { tabname: 'Legal', path: '/legal' };
const privacyTab: Tab = { tabname: 'Privacy', path: '/privacy' };
/**
 * Object mapping routes to their corresponding navigation tabs.
 * Each key represents a route, and the value is an array of Tab objects.
 */
export const routeToNavTabsMapping: Record<string, Tab[]> = {
  '/': [signInPageRouteTab, signUpPageRouteTab, buildTreePageRouteTab],
  '/generate': [homePageRouteTab, visualizePageRouteTab],
  '/output': [homePageRouteTab, buildTreePageRouteTab],
};
/**
 * Maps application routes to footer visibility flags, indicating whether the footer should be displayed on a given route.
 */
export const routeToFooterVisibilityMapping: Record<string, boolean> = {
  '/': true,
};

/**
 * Maps footer labels to link, links to be added.
 */

export const footerLinks: Tab[] = [
  cookiePreferencesTab,
  securityTab,
  legalTab,
  privacyTab,
];
