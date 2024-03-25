import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import LinktaLogo from './header/LinktaLogoWithText';
import TopNavigationBar from './header/TopNavigationBar';
import useDynamicNavigation from '@/client/hooks/useDynamicNavigation';
/**
 * MainLayout manages the app's global layout, using `useDynamicNavigation` for route-based UI adjustments. It presents a consistent header featuring the LinktaLogo, with the top navigation bar and footer rendered conditionally as dictated by the current route's needs.
 *
 * - `showTopNavBar` and `showFooter`: Boolean values from `useDynamicNavigation` determine the visibility of the TopNavigationBar and Footer, respectively.
 * - The `Outlet` component handles rendering of route-specific content in the main section.
 */
interface MainLayoutProps {
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  const { showTopNavBar, showFooter } = useDynamicNavigation();

  return (
    <div>
      <header>
        <LinktaLogo />
      </header>
      {showTopNavBar && (
        <nav>
          <TopNavigationBar />
        </nav>
      )}
      <main>
        <Outlet />
      </main>
      {showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
