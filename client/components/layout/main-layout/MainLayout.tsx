import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

const MainLayout: React.FC = () => {
  return (
    <div >
      <header>
      <Header/>
      </header>
        <main>
        <Outlet />
        </main>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}

export default MainLayout;