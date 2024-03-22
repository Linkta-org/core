import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { topNavigationTabs } from '../layoutConfig';

const TopNavigationBar = () => {
  const location = useLocation();
  const currentTabs =
    topNavigationTabs[location.pathname] || topNavigationTabs['/'];

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {currentTabs &&
          currentTabs.map((tab) => (
            <NavigationMenu.Item key={tab.tabname}>
              <Link to={tab.path}>{tab.tabname}</Link>
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default TopNavigationBar;
