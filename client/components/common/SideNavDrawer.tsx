import React from 'react';
import {
  AccountCircleOutlined,
  AddCircleOutline,
  HelpOutlineOutlined,
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';
import { Box, Typography, Button, Drawer, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import '@styles/SideNavDrawer.css';
import UserInputHistory from '@components/layout/UserInputHistory';

type sideNavProps = {
  drawerOpen: boolean;
  matching: boolean;
  toggleDrawer: () => void;
};

export default function SideNavDrawer({
  drawerOpen,
  matching,
  toggleDrawer,
}: sideNavProps) {
  const mountedStyle = { animation: 'opacity-in 300ms ease-in' };
  const unmountedStyle = {
    animation: 'opacity-out 200ms ease-in',
    animationFillMode: 'forwards',
  };

  const DrawerListExpanded = (
    <Box className='side-nav-bar'>
      <Link
        className='side-nav-link'
        underline='none'
        mt={9}
        component={RouterLink}
        to='/sign-in'
      >
        <AccountCircleOutlined />
        <Typography variant='caption'>test-1.user@linkta.org</Typography>
      </Link>

      <Link
        className="side-nav-link"
        underline='none'
        component={RouterLink}
        to='/generate'
      >
        <AddCircleOutline />
        <Typography variant='caption'>Explore a New Topic</Typography>
      </Link>

      <UserInputHistory />

      <Link
        className='side-nav-link'
        underline='none'
        mt={'auto'}
        component={RouterLink}
        to='/help-and-feedback'
      >
        <HelpOutlineOutlined />
        <Typography variant='caption'>Help and Feedback</Typography>
      </Link>

      <Link
        className='side-nav-link'
        underline='none'
        component={RouterLink}
        to='/settings'
      >
        <SettingsOutlined />
        <Typography variant='caption'>Settings</Typography>
      </Link>

      <Button
        className='drawer-close-button'
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
        <Box className='side-nav-compact'>
          <Link
            className='side-mini-button'
            mt={3}
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/sign-in'
          >
            <AccountCircleOutlined />
          </Link>

          <Link
            className='side-mini-button'
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/generate'
          >
            <AddCircleOutline />
          </Link>

          <Link
            className='side-mini-button'
            sx={{ marginTop: 'auto' }}
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/help-and-feedback'
          >
            <HelpOutlineOutlined />
          </Link>

          <Link
            className='side-mini-button'
            style={drawerOpen ? unmountedStyle : mountedStyle}
            component={RouterLink}
            to='/settings'
          >
            <SettingsOutlined />
          </Link>

          <Button
            className={`drawer-open-button ${matching ? 'disabled' : ''}`}
            onClick={toggleDrawer}
            disabled={matching}
          >
            <ChevronRightOutlined />
          </Button>
        </Box>
      ) : (
        <Box className='side-nav'></Box>
      )}

      <Drawer
        className='drawer'
        open={drawerOpen}
        onClose={toggleDrawer}
        variant='persistent'
      >
        {DrawerListExpanded}
      </Drawer>
    </>
  );
}
