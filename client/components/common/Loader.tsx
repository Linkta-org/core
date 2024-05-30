import { Box } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // Use fixed positioning to ensure it's centered in the viewport
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the Box by shifting it back by 50% of its own size
        width: '700px',
        height: '300px',
      }}
    >
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '100px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '100px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box
        sx={{
          position: 'absolute',
          left: '106px', // Half the width of the dot to center the line
          top: '66px', // Half the height of the dot to center the line
          width: '0px',
          height: '108px', // Distance between the two dots
          backgroundColor: '#FFA51B',
          animation: 'drawLine 0.5s forwards',
        }}
      />
      <style>
        {`
          @keyframes drawLine {
            from {
              width: 0;
              height: 0;
            }
            to {
              width: 2px;
              height: 108px;
            }
          }
        `}
      </style>
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '173px', top: '174px', backgroundColor: '#FFA51B', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '200px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '200px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '236px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '236px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '296px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '296px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '332px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '332px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '332px', top: '115px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '395px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '395px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '431px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '515px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '473px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '470px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '578px', top: '60px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '545px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '621px', top: '174px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '557px', top: '115px', backgroundColor: '#FFA51B' }} />
      <Box sx={{ position: 'absolute', width: '12px', height: '12px', left: '608px', top: '115px', backgroundColor: '#FFA51B' }} />
    </Box>
  );
};

export default Loader;
