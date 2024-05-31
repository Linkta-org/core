import { BaseEdge, getBezierPath } from 'reactflow';
import type { EdgeProps } from 'reactflow';
import React from 'react';

export default function CustomEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
      />
    </>
  );
}
