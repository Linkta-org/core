import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import SideNavDrawer from '@components/common/SideNavDrawer';
import useMatchMedia from '@hooks/useMatchMedia';
import '@styles/MainLayout.css';
import useDrawerStore from '@stores/userDrawerStore';
import useUpdateLinktaFlowMutation from '@hooks/useUpdateLinktaFlowMutation';
import useLinktaFlowStore from '@stores/LinktaFlowStore';
import useSignOut from '@hooks/useSignOut';
import useAuth from '@hooks/useAuth';

/**
 * MainLayout provides the app's global UI layout and the Router Outlet.
 * It presents a consistent header featuring the LinktaLogo, with the side navigation bar rendered as open or compact conditionally based on screen width.
 * The `Outlet` component handles rendering of route-specific content in the main section.
 */
const MainLayout: React.FC = () => {
  const breakpoint = 768;
  const matching = useMatchMedia(breakpoint);
  const { drawerOpen, setDrawerOpen } = useDrawerStore();
  const { mutate: updateLinktaFlow } = useUpdateLinktaFlowMutation();
  const currentLinktaFlow = useLinktaFlowStore((state) =>
    state.getCurrentFlow(),
  );

  const handleSave = () => {
    if (!currentLinktaFlow) {
      console.error('No linktaFlow selected');
      return;
    }

    const { _id: linktaFlowId, nodes, edges } = currentLinktaFlow;

    updateLinktaFlow({ linktaFlowId, updatedLinktaFlow: { nodes, edges } });
  };
  const signOutMutation = useSignOut();
  const { isAuthenticated } = useAuth();

  const toggleDrawer = () => {
    !matching && setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    matching && setDrawerOpen(false);
  }, [matching, setDrawerOpen]);

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log('Signed out successfully');
      },
      onError: (error) => {
        console.error('Error signing out:', error);
      },
    });
  };

  return (
    <>
      {/* this Box creates the Linkta background color layer */}
      <Box className='background-color'></Box>

      {/* this Box displays the Linkta glowing tree background image and blends with the background color */}
      <Box className='background-image'></Box>

      {/* this Box contains the Linkta main layout components - top bar, side nav, router outlet */}
      <Box
        className={`static-layout ${drawerOpen ? 'layout-open' : 'layout-closed'}`}
        component='main'
      >
        <Box
          className={`linkta-logo-container ${drawerOpen ? 'layout-open' : 'layout-closed'}`}
        >
          <img
            className={`linkta-logo-image ${drawerOpen ? 'layout-open' : 'layout-closed'}`}
            src='../assets/linkta-logo-web.png'
            alt='The Linkta.io logo at approximately 50 pixels square, located in the upper-left corner of the page.'
          />
        </Box>

        <Box className='top-nav-bar'>
          <ButtonGroup
            className='save-button-group'
            variant='contained'
            color='secondary'
            disableElevation
            sx={{ marginLeft: 'auto', height: '26px' }}
          >
            <Button
              className='save-button-group-item'
              sx={{
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                paddingBottom: '4px',
              }}
              onClick={handleSave}
            >
              <Typography variant='button'>Save</Typography>
            </Button>

            {isAuthenticated && (
              <Button
                className='save-button-group-item'
                sx={{
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  paddingBottom: '4px',
                }}
                onClick={handleSignOut}
              >
                <Typography variant='button'>Sign Out</Typography>
              </Button>
            )}

            <Button
              className='save-button-group-item'
              sx={{
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                width: '0px',
              }}
            >
              <ArrowDropDown />
            </Button>
          </ButtonGroup>
        </Box>

        <SideNavDrawer
          drawerOpen={drawerOpen}
          matching={matching}
          toggleDrawer={toggleDrawer}
        />

        <Box className='router-outlet'>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
