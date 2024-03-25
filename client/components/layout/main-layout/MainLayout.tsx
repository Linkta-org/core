import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import LinktaLogo from './header/LinktaLogoWithText';
import TopNavigationBar from './header/TopNavigationBar';
import useDynamicNavigation from '@/client/hooks/useDynamicNavigation';
/**
 * Provides a consistent layout structure across the app with conditional
 * rendering of the top navigation bar and footer based on the current route.
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
