import React, { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

const LinktaFlowNode = memo(({ data }: NodeProps) => {
  return (
    <>
      {data.label}
      <Handle
        type="source"
        position={Position.Top}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="d"
      />
    </>
  );
});

LinktaFlowNode.displayName = 'LinktaFlowNode';

export default LinktaFlowNode;
