import React from 'react';
import type { EdgeProps } from 'reactflow';
import { BaseEdge, getStraightPath } from 'reactflow';

export function MindMapEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      path={edgePath}
      {...props}
    />
  );
}
