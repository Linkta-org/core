import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, TextField } from '@mui/material';

const handleStyle = { left: 10 };

export function LinktaNode({ data, isConnectable, color }) {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: '#1c4b29',
        height: '44px',
        width: '168px',
        display: 'flex',
        borderRadius: '5px',
        boxShadow: isFocused
          ? '0px 0px 4px 1px #FFA51B96'
          : '0px 4px 4px 0px #00000040',
        border: isFocused ? '0.5px solid #FFA51B' : '0.5px solid transparent',
        transition: 'box-shadow 0.3s, border 0.3s',
      }}
      className="linkta-node"
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          borderRadius: '5px 0 0 5px',
          width: '8px',
          bgcolor: color || 'deeppink',
          height: '100%',
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          defaultValue="Transport Layer"
          hiddenLabel
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          id="filled-hidden-label-small"
          size="small"
          sx={{
            background: 'transparent',
            border: 'none',
            borderRadius: '1px',
            color: 'inherit',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            padding: '0 2px',

            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove default border
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove focus ring border
              },
            },
            '& input': {
              textAlign: 'center',
              fontSize: '11px',
            },
          }}
        />
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </Box>
  );
}
