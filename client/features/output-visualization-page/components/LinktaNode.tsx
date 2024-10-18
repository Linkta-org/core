import type { ChangeEvent } from 'react';
import React, { useState, memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Box, TextField } from '@mui/material';
import styles from '@styles/LinktaFlow.module.css';

type LinktaNodeData = {
  color?: string;
  label?: string;
  id: string;
};

type LinktaNodeProps = NodeProps<LinktaNodeData> & {
  isConnectable: boolean;
};

const LinktaNode = memo(({ isConnectable, data }: LinktaNodeProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [label, setLabel] = useState(data.label || 'TCP/IP Model');

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLabel(e.target.value);

  return (
    <Box
      className={`${styles.nodeWrapper} ${isFocused ? styles.nodeFocused : ''}`}
    >
      <Box className={styles.nodeColorBar} />
      <Box className={styles.nodeContent}>
        <TextField
          hiddenLabel
          value={label}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleLabelChange}
          size='small'
          id='filled-hidden-label-small'
          className={styles.textField}
          InputProps={{
            classes: {
              input: styles.textFieldInput,
              root: styles.textFieldFieldset,
            },
          }}
        />
      </Box>
      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        className={styles.handle}
        isConnectable={isConnectable}
      />
      <Handle
        type='target'
        position={Position.Top}
        id='d'
        className={styles.handle}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        className={styles.handle}
        isConnectable={isConnectable}
      />
      <Handle
        type='target'
        position={Position.Left}
        id='c'
        className={styles.handle}
        isConnectable={isConnectable}
      />
    </Box>
  );
});

LinktaNode.displayName = 'LinktaNode';
export default LinktaNode;
