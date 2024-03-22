import { Tab } from "../../../types";

//todo: add more tabs
const signInTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpTab = { tabname: 'Start Growing', path: '/sign-up' };
const exploreTab = { tabname: 'Explore', path: '/generate' }; // tbd

export const topNavigationTabs: Record<string, Tab[]> = {
  '/': [signInTab, signUpTab, exploreTab],
  '/generate': [signInTab, signUpTab],
};
