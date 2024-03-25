import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { topNavigationTabsByRoute } from '@/client/components/layout/main-layout/layoutConfig';
import type { Tab } from '@/client/types/layout';
/**
 * Renders a navigation menu with tabs based on the current route.
 *
 * Note:
 * The `pathname` from `useLocation` is used to determine the current route.
 * The `topNavigationTabsByRoute[pathname]` gets the tabs for the current route, fallback to '/' if not found.
 */
const TopNavigationBar: React.FC = () => {
  const { pathname } = useLocation();

  const currentTabs: Tab[] =
    topNavigationTabsByRoute[pathname] ?? topNavigationTabsByRoute['/'];

  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {currentTabs &&
          currentTabs.map((tab) => (
            <NavigationMenu.Item key={`${pathname}-${tab.tabname}`}>
              <Link to={tab.path}>{tab.tabname}</Link>
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default TopNavigationBar;
