import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import styles from '@styles/layout/UnauthorizedLayout.module.css';

/**
 * UnauthorizedLayout provides a simple layout and Router Outlet for the Auth Views.
 * It presents a consistent header featuring the LinktaLogo, with no side navigation bar
 * The `Outlet` component handles rendering of route-specific content in the main section.
 */
const UnauthorizedLayout: React.FC = () => {

  const handleSignIn = () => {
    console.log('SIGN IN');
  }

  const handleSignUp = () => {
    console.log('SIGN UP');
  }

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
            src="../assets/linkta-logo-amber.png"
            alt="The Linkta.io logo at approximately 50 pixels square, located in the upper-left corner of the page."
          />
          <Typography variant='h6'>Linkta</Typography>

          <Button className={`${styles.signInButton}`} variant='contained' onClick={handleSignIn}>Sign In</Button>
          <Button className={`${styles.signUpButton}`} variant='contained' onClick={handleSignUp}>Start Growing</Button>
        </Box>

        <Box className={`${styles.routerOutlet}`}>
          <Outlet />
        </Box>

        <Box className={`${styles.footerBar}`}>
          <Typography variant='body2' className='first'>
            2024 Linkta L.L.C. All rights Reserved
          </Typography>
          <Typography variant='body2'>
            Cookie Preferences
          </Typography>
          <Typography variant='body2'>
            Security
          </Typography>
          <Typography variant='body2'>
            Legal
          </Typography>
          <Typography variant='body2'>
            Privacy
          </Typography>
        </Box>

      </Box>
    </>
  );
};

export default UnauthorizedLayout;
