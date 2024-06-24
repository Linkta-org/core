import React from 'react';
import type { ConnectionLineComponentProps } from 'reactflow';

const ConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  return (
    <g>
      <path
        fill='none'
        stroke='#FFA51B'
        strokeWidth={1.5}
        className='animated'
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
    </g>
  );
};
ConnectionLine.displayName = 'ConnectionLine';
export default ConnectionLine;
