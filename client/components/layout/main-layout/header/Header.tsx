import React from 'react';
import TopNavigationBar from './TopNavigationBar';
import LinktaMainLogo from './LinktaMainLogo';

const Header = () => {
  return (
    <>
      <LinktaMainLogo />
      <nav>
      <TopNavigationBar />
      </nav>
    </>
  );
};

export default Header;
