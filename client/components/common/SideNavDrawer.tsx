import React from 'react';
import {
  AccountCircleOutlined,
  AddCircleOutline,
  HelpOutlineOutlined,
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';
import { Box, Typography, Button, Drawer, Link, Skeleton } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import styles from '@styles/SideNavDrawer.module.css';
import UserInputHistory from '@components/layout/UserInputHistory';
import { useFetchUserProfile } from '@hooks/useUserCrudOperations';
import useWatchAuthenticatedState from '@hooks/useWatchAuthenticatedState';

type SideNavProps = {
  drawerOpen: boolean;
  screenWithinBreakpoint: boolean;
  toggleDrawer: () => void;
};

export default function SideNavDrawer({
  drawerOpen,
  screenWithinBreakpoint,
  toggleDrawer,
}: SideNavProps) {
  const mountedStyle = { animation: 'opacity-in 300ms ease-in' };
  const unmountedStyle = {
    animation: 'opacity-out 200ms ease-in',
    animationFillMode: 'forwards',
  };

  const { data: userProfile } = useFetchUserProfile('Side Nav Drawer');
  const { isAuthenticated } = useWatchAuthenticatedState();

  const DrawerListExpanded = (
    <Box className={`${styles.sideNavBar}`}>
      {isAuthenticated && (
        <>
          <Link
            className={`${styles.sideNavLink}`}
            component={RouterLink}
            to='/settings'
          >
            <AccountCircleOutlined />
            <Typography variant='caption'>
              {userProfile ? (
                userProfile?.name
              ) : (
                <Skeleton variant='text'>
                  <Typography variant='caption'>NAME PLACEHOLDER</Typography>
                </Skeleton>
              )}
            </Typography>
          </Link>

          <Link
            className={`${styles.sideNavLink}`}
            component={RouterLink}
            to='/generate'
          >
            <AddCircleOutline />
            <Typography variant='caption'>Explore a New Topic</Typography>
          </Link>

          <UserInputHistory />
        </>
      )}

      <Link
        className={`${styles.sideNavLink}`}
        mt={'auto'}
        component={RouterLink}
        to='/help'
      >
        <HelpOutlineOutlined />
        <Typography variant='caption'>Help and Feedback</Typography>
      </Link>

      <Link
        className={`${styles.sideNavLink}`}
        component={RouterLink}
        to='/settings'
      >
        <SettingsOutlined />
        <Typography variant='caption'>Settings</Typography>
      </Link>

      <Button
        className={`${styles.drawerCloseButton}`}
        onClick={toggleDrawer}
        sx={{ paddingInline: '13.5px' }}
      >
        <ChevronLeftOutlined />
      </Button>
    </Box>
  );

  return (
    <>
      {!drawerOpen ? (
        <Box className={`${styles.sideNavCompact}`}>
          {isAuthenticated && (
            <>
              <Link
                className={`${styles.sideMiniButton}`}
                mt={3}
                style={drawerOpen ? unmountedStyle : mountedStyle}
                component={RouterLink}
                to='/login'
              >
                <AccountCircleOutlined />
              </Link>

              <Link
                className={`${styles.sideMiniButton}`}
                style={drawerOpen ? unmountedStyle : mountedStyle}
                component={RouterLink}
                to='/generate'
              >
                <AddCircleOutline />
              </Link>
            </>
          )}

          <Link
            className={`${styles.sideMiniButton}`}
            sx={{ marginTop: 'auto' }}
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/help'
          >
            <HelpOutlineOutlined />
          </Link>

          <Link
            className={`${styles.sideMiniButton}`}
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/settings'
          >
            <SettingsOutlined />
          </Link>

          <Button
            className={`${styles.drawerOpenButton}`}
            classes={{ disabled: styles.disabled }}
            onClick={toggleDrawer}
            disabled={screenWithinBreakpoint}
          >
            <ChevronRightOutlined />
          </Button>
        </Box>
      ) : (
        <Box></Box>
      )}

      <Drawer
        classes={{ paper: styles.drawerPaper }}
        open={drawerOpen}
        onClose={toggleDrawer}
        variant='persistent'
      >
        {DrawerListExpanded}
      </Drawer>
    </>
  );
}
