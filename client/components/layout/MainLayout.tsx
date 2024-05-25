import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import LinktaLogo from './LinktaLogoWithText';
import TopNavigationBar from './TopNavigationBar';
import useDynamicNavigation from '@/client/hooks/useDynamicNavigation';
import { Box, Button, ButtonGroup, Container, Link, Typography } from '@mui/material';
import { ArrowDropDown, ChevronLeftOutlined, AccountCircleOutlined, AddCircleOutline, HelpOutlineOutlined, SettingsOutlined } from '@mui/icons-material';
import '@client/styles/MainLayout.css';

/**
 * MainLayout manages the app's global layout, using `useDynamicNavigation` for route-based UI adjustments. It presents a consistent header featuring the LinktaLogo, with the top navigation bar and footer rendered conditionally as dictated by the current route's needs.
 *
 * - `showTopNavBar` and `showFooter`: Boolean values from `useDynamicNavigation` determine the visibility of the TopNavigationBar and Footer, respectively.
 * - The `Outlet` component handles rendering of route-specific content in the main section.
 */
const MainLayout: React.FC = () => {
  // const { showTopNavBar, showFooter } = useDynamicNavigation();

  return (
    <>
      {/* this Box creates the Linkta background color layer */}
      <Box
        className="background-color">
      </Box>

      {/* this Box displays the Linkta glowing tree background image and blends with the background color */}
      <Box
        className="background-image">
      </Box>

      {/* this Box contains the Linkta main layout components - top bar, side nav, router outlet */}
      <Box
        className="static-layout"
        component='main'
      >

        <Box
          className='linkta-logo-container'
        >
          <img className='linkta-logo-image' src='../assets/linkta-logo-gray.svg' />
        </Box>

        <Box className='top-nav-bar' >
          <ButtonGroup
            className='save-button-group'
            variant='contained'
            color='secondary'
            disableElevation
            sx={{ marginLeft: 'auto', height: '26px' }}
          >

            <Button
              className='save-button-group-item'
              sx={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, paddingBottom: '4px' }}
            >
              <Typography variant='button'>
                Save
              </Typography>
            </Button>

            <Button
              className='save-button-group-item'
              sx={{ borderTopRightRadius: 50, borderBottomRightRadius: 50, width: '0px' }}
            >
              <ArrowDropDown />
            </Button>

          </ButtonGroup>
        </Box>

        <Box className='side-nav-bar'>
          <Button className='side-nav-button' variant='text' startIcon={<AccountCircleOutlined />}>
            <Typography variant='caption'>
              test.user@linkta.org
            </Typography>
          </Button>

          <Button className='side-nav-button' variant='text' startIcon={<AddCircleOutline />}>
            <Typography variant='caption'>
              Explore a New Topic
            </Typography>
          </Button>

          <Box className='recent-user-inputs' mt={5}>
            <Typography variant='body2' color={'primary.contrastText'}>Recent</Typography>
          </Box>

          <Button className='side-nav-button' startIcon={<HelpOutlineOutlined />} sx={{ marginTop: 'auto' }}>
            <Typography variant='caption'>
              Help and Feedback
            </Typography>
          </Button>

          <Button className='side-nav-button' startIcon={<SettingsOutlined />}>
            <Typography variant='caption'>
              Settings
            </Typography>
          </Button>

          <Button className='drawer-close-button' endIcon={<ChevronLeftOutlined />}>

          </Button>
        </Box>

        <Container className='router-outlet' >
        </Container>

      </Box>
    </>
  );
};

export default MainLayout;
