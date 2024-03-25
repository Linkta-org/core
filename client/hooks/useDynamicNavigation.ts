import { useLocation } from 'react-router-dom';
import { topNavigationTabsByRoute } from '@/client/components/layout/main-layout/layoutConfig';
import type { Tab } from '@/client/types/layout';

const useDynamicNavigation = () => {
  const { pathname } = useLocation();

  const showTopNavBar = pathname in topNavigationTabsByRoute;

  const currentTabs: Tab[] =
    topNavigationTabsByRoute[pathname] ?? topNavigationTabsByRoute['/'];

  return { showTopNavBar, currentTabs };
};

export default useDynamicNavigation;
