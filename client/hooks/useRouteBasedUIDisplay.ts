import { useLocation } from 'react-router-dom';
import { topNavigationTabsByRoute } from '@/client/components/layout/main-layout/layoutConfig';
import type { Tab } from '@/client/types/layout';

const useRouteBasedUIDisplay = () => {
  const { pathname } = useLocation();

  const showNavigation = pathname in topNavigationTabsByRoute;

  const currentTabs: Tab[] =
    topNavigationTabsByRoute[pathname] ?? topNavigationTabsByRoute['/'];

  return { showNavigation, currentTabs };
};

export default useRouteBasedUIDisplay;
