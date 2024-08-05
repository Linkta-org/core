import React, { useState, memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Box, TextField, Typography } from '@mui/material';
import styles from '@styles/layout/LinktaNode.module.css';

type LinktaNodeData = {
  color?: string | undefined;
  label?: string;
  id: string;
};

type LinktaNodeProps = NodeProps<LinktaNodeData> & {
  isConnectable: boolean;
};

const handleStyle = {};

const LinktaFlowNode = memo(({ isConnectable, data }: LinktaNodeProps) => {
  const [placeholderData, setPlaceholderData] = useState({
    id: data.id,
    type: 'linktaNode',
    position: { x: 0, y: 0 },
    data: { label: 'TCP/IP Model' },
  });
  const [isEditing, setIsEditing] = useState(false);

  const onFocus = () => setIsEditing(true);
  const onBlur = () => setIsEditing(false);

  return (
    <Box
      className={styles.nodeBox}
      onClick={onFocus}
      onBlur={onBlur}
      // sx={{
      //   bgcolor: isEditing ? '#1a3e37' : '#183636',
      //   height: '44px',
      //   width: '168px',
      //   display: 'flex',
      //   borderRadius: '5px',
      //   border: isEditing ? '0.2px solid #FFA51B' : '0.2px  solid #000',
      //   borderLeft: isEditing ? '0.2px solid #FFA51B' : 'none',
      //   boxShadow: isEditing
      //     ? '0px 0px 4px 1px #FFA51B96'
      //     : '2px 4px 8px hsl(0deg 0% 0% / 0.25)',
      //   transition: 'box-shadow 0.3s, border 0.3s',
      // }}
      // className='linkta-node'
    >
      <Box
        className={styles.nodeHandle}
        // sx={{
        //   borderRadius: '5px 0 0 5px',
        //   width: '8px',
        //   bgcolor: data.color || '#0442E1',
        //   height: '100%',
        // }}
      />
      <Box
        className={styles.nodeTextBox}
        // sx={{
        //   flexGrow: 1,
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        // }}
      >
        {isEditing && (
          <TextField
            hiddenLabel
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPlaceholderData({
                ...placeholderData,
                data: { ...data, label: e.target.value },
              })
            }
            value={data.label}
            id='filled-hidden-label-small'
            size='small'
            // sx={{
            //   background: 'transparent',
            //   border: 'none',
            //   borderRadius: '1px',
            //   color: 'inherit',
            //   fontFamily: 'Inter, sans-serif',
            //   fontWeight: 500,
            //   padding: '0 2px',

            //   '& .MuiOutlinedInput-root': {
            //     '& fieldset': {
            //       border: 'none',
            //     },
            //     '&.Mui-focused fieldset': {
            //       border: 'none',
            //     },
            //   },
            //   '& input': {
            //     textAlign: 'center',
            //     fontSize: '11px',
            //   },
            // }}
            className={styles.nodeTextField}
          />
        )}
        {!isEditing && (
          <Typography
            variant='body1'
            id='filled-hidden-label-small'
            className={styles.nodeTypography}
            // size='small'
            // sx={{
            //   background: 'transparent',
            //   border: 'none',
            //   borderRadius: '1px',
            //   color: 'inherit',
            //   fontFamily: 'Inter, sans-serif',
            //   fontWeight: 500,
            //   padding: '0 2px',

            //   '& .MuiOutlinedInput-root': {
            //     '& fieldset': {
            //       border: 'none',
            //     },
            //     '&.Mui-focused fieldset': {
            //       border: 'none',
            //     },
            //   },
            //   '& input': {
            //     textAlign: 'center',
            //     fontSize: '11px',
            //   },
            // }}
          >
            {data.label}
          </Typography>
        )}
      </Box>
      <Handle
        type='source'
        position={Position.Top}
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type='target'
        position={Position.Bottom}
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </Box>
  );
});

LinktaFlowNode.displayName = 'LinktaFlowNode';
export default LinktaFlowNode;
