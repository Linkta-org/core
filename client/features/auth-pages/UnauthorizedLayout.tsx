import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import styles from '@styles/layout/UnauthorizedLayout.module.css';

/**
 * UnauthorizedLayout provides a simple layout and Router Outlet for the Auth Views.
 * It presents a consistent header featuring the LinktaLogo, with no side navigation bar
 * The `Outlet` component handles rendering of route-specific content in the main section.
 */
const UnauthorizedLayout: React.FC = () => {


  return (
    <>
      {/* this Box creates the Linkta background color layer */}
      <Box className={`${styles.backgroundColor}`}></Box>

      {/* this Box displays the Linkta glowing tree background image and blends with the background color */}
      <Box className={`${styles.backgroundImage}`}></Box>

      {/* this Box contains the Linkta main layout components - top bar, side nav, router outlet */}
      <Box
        className={`${styles.staticLayout}`}
        component="main"
      >

        <Box className={`${styles.headerBar}`}>
          <img
            className={`${styles.logoImage}`}
            src="../assets/linkta-logo-web.png"
            alt="The Linkta.io logo at approximately 50 pixels square, located in the upper-left corner of the page."
          />
        </Box>

        <Box className={`${styles.routerOutlet}`}>
          <Outlet />
        </Box>

      </Box>
    </>
  );
};

export default UnauthorizedLayout;
