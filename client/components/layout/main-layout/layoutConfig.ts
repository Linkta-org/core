//todo: add more tabs
const signInTab = { tabname: 'Sign In', path: '/sign-in' };
const signUpTab = { tabname: 'Start Growing', path: '/sign-up' };
const exploreTab = { tabname: 'Explore', path: '/generate' }; // tbd

export const topNavigationTabs = {
  '/': [
    signInTab,
    signUpTab,
    exploreTab,
  ],
  '/generate': [
    signInTab,
    signUpTab,
  ],
};
