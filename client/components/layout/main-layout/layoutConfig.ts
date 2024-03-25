import type { Tab } from '@/client/types/layout';

const homeTab = { tabname: 'Home', path: '/' };
const signInTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpTab = { tabname: 'Start Growing', path: '/sign-up' };
const exploreTab = { tabname: 'Explore', path: '/generate' };
const visualizeTab = { tabname: 'Visualize', path: '/output' };

export const topNavigationTabsByRoute: Record<string, Tab[]> = {
  '/': [signInTab, signUpTab, exploreTab, visualizeTab],
  '/generate': [homeTab, visualizeTab],
  '/output': [homeTab, exploreTab],
};
