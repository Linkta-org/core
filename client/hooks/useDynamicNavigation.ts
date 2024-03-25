import { useLocation } from 'react-router-dom';
import { routeToNavTabsMapping, routeToFooterVisibilityMapping } from '@/client/components/layout/main-layout/layoutConfig';
import type { Tab } from '@/client/types/layout';
/**
 * Custom hook that provides UI visibility controls and navigation configuration based on the current route.
 *
 * Uses `useLocation` from `react-router-dom` to access the current pathname and evaluates this against predefined
 * configuration objects (`topNavigationTabsByRoute` and `footerVisibilityByRoute`) to ascertain UI elements' visibility and content.
 *
 * @returns An object containing:
 * - `showTopNavBar`: Boolean indicating if the top navigation bar should be displayed.
 * - `currentNavTabs`: Array of Tab objects representing the tabs to be displayed in the top navigation bar.
 * - `showFooter`: Boolean indicating if the footer should be displayed.
 */
const useDynamicNavigation = () => {
  const { pathname } = useLocation();

  const showTopNavBar = pathname in routeToNavTabsMapping;

  const currentNavTabs: Tab[] =
    routeToNavTabsMapping[pathname] ?? routeToNavTabsMapping['/'];

  const showFooter = pathname in routeToFooterVisibilityMapping;

  return { showTopNavBar, currentNavTabs, showFooter };
};

export default useDynamicNavigation;
