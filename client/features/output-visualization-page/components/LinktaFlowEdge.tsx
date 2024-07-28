import React, { useCallback } from 'react';
import { useStore, getBezierPath, Position } from 'reactflow';
import type { EdgeProps } from 'reactflow';
import { getEdgeParams } from '@utils/getEdgeParams';

function LinktaFlowEdge({ id, source, target, markerEnd, style }: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getBezierPath({
    sourceX: sx as number,
    sourceY: sy as number,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    targetX: tx as number,
    targetY: ty as number,
  });

  return (
    <path
      id={id}
      className='react-flow__edge-path'
      d={edgePath}
      strokeWidth={3}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default LinktaFlowEdge;
