import React, { useState, memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Box, TextField } from '@mui/material';
import '@styles/react-flow.css';

type LinktaNodeData = {
  color?: string | undefined;
  label?: string;
  id: string;
};

type LinktaNodeProps = NodeProps<LinktaNodeData> & {
  isConnectable: boolean;
};

const LinktaNode = memo(({ isConnectable, data }: LinktaNodeProps) => {
  const [placeholderData, setPlaceholderData] = useState({
    id: data.id,
    type: 'linktaNode',
    position: { x: 0, y: 0 },
    data: { label: 'TCP/IP Model' },
  });
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <Box
      sx={{
        bgcolor: isFocused ? '#1a3e37' : '#183636',
        height: '44px',
        width: '168px',
        display: 'flex',
        borderRadius: '5px',
        border: isFocused ? '0.2px solid #FFA51B' : '0.2px  solid #000',
        borderLeft: isFocused ? '0.2px solid #FFA51B' : 'none',
        boxShadow: isFocused
          ? '0px 0px 4px 1px #FFA51B96'
          : '2px 4px 8px hsl(0deg 0% 0% / 0.25)',
        transition: 'box-shadow 0.3s, border 0.3s',
      }}
      className='linkta-node'
    >
      <Box
        sx={{
          borderRadius: '5px 0 0 5px',
          width: '8px',
          bgcolor: data.color || '#0442E1',
          height: '100%',
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--primary-dark)',
        }}
      >
        <TextField
          hiddenLabel
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlaceholderData({
              ...placeholderData,
              data: { ...data, label: e.target.value },
            })
          }
          value={data.label}
          id='filled-hidden-label-small'
          size='small'
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
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
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
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
      <Handle
        type='target'
        position={Position.Top}
        id='d'
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        isConnectable={isConnectable}
      />
      <Handle
        type='target'
        position={Position.Left}
        id='c'
        isConnectable={isConnectable}
      />
    </Box>
  );
});

LinktaNode.displayName = 'LinktaNode';
export default LinktaNode;
