import { useLocation } from 'react-router-dom';
import { topNavigationTabsByRoute } from '@/client/components/layout/main-layout/layoutConfig';
import type { Tab } from '@/client/types/layout';
/**
 * Custom hook for determining navigation bar visibility and fetching relevant tabs based on the current route.
 *
 * @returns { showTopNavBar, currentTabs } An object containing the visibility state of the top navigation bar
 * and the tabs to display.
 */
const useDynamicNavigation = () => {
  const { pathname } = useLocation();

  const showTopNavBar = pathname in topNavigationTabsByRoute;

  const currentNavTabs: Tab[] =
    topNavigationTabsByRoute[pathname] ?? topNavigationTabsByRoute['/'];

  return { showTopNavBar, currentNavTabs };
};

export default useDynamicNavigation;
