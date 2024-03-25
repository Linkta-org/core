import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import LinktaLogo from './header/LinktaLogoWithText';
import TopNavigationBar from './header/TopNavigationBar';
import { topNavigationTabsByRoute } from './layoutConfig';
/**
 * Provides a consistent layout structure across the app with conditional
 * rendering of the top navigation bar and footer based on the current route.
 */
interface MainLayoutProps {
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ showFooter = false }) => {
  const location = useLocation();

  const showTopNavBar = location.pathname in topNavigationTabsByRoute;

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
