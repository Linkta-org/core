import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import LinktaLogo from './header/LinktaLogoWithText';
import TopNavigationBar from './header/TopNavigationBar';
import useRouteBasedUIDisplay from '@/client/hooks/useRouteBasedUIDisplay';
/**
 * Provides a consistent layout structure across the app with conditional
 * rendering of the top navigation bar and footer based on the current route.
 */
interface MainLayoutProps {
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ showFooter = false }) => {
  const showTopNavBar = useRouteBasedUIDisplay();

  return (
    <div>
      <header>
        <LinktaLogo />
        {showTopNavBar && (
          <nav>
            <TopNavigationBar />
          </nav>
        )}
      </header>
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
