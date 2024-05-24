import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import useDynamicNavigation from '@/client/hooks/useDynamicNavigation';
/**
 * Renders a navigation menu with tabs based on the current route.
 *
 * The `useDynamicNavigation` hook is used to retrieve the current navigation tabs. It determines the tabs to display based on the current route.
 */
const TopNavigationBar: React.FC = () => {
  const { currentNavTabs } = useDynamicNavigation();

  return (
    <NavigationMenu.Root className='NavigationMenuRoot'>
      <NavigationMenu.List className='NavigationMenuList'>
        {currentNavTabs &&
          currentNavTabs.map((tab) => (
            <NavigationMenu.Item key={`${tab.path}-${tab.tabname}`}>
              <Link to={tab.path}>{tab.tabname}</Link>
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default TopNavigationBar;
