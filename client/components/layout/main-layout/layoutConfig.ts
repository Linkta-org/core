import type { Tab } from '@/client/types/layout';

const signInTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpTab = { tabname: 'Start Growing', path: '/sign-up' };
const exploreTab = { tabname: 'Explore', path: '/generate' }; // tbd
const visualizeTab = { tabname: 'Visualize', path: '/output' }; // tbd

export const topNavigationTabs: Record<string, Tab[]> = {
  '/': [signInTab, signUpTab, exploreTab, visualizeTab],
  // add more tabs here
};
