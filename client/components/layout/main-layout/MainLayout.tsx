import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
/**
 * MainLayout component wraps the children components with a common structure
 * It is used to provide a consistent layout across different pages.
 * @param props - The component props.
 * @param props.showFooter - Determines if the footer should be rendered. Defaults to false.
 * @returns The MainLayout component with Header, Outlet for nested routes, and optional Footer.
 */
interface MainLayoutProps {
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ showFooter = false }) => {
  return (
    <div>
      <header>
        <Header />
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
}

export default MainLayout;