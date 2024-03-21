import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

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