import { Position, internalsSymbol } from 'reactflow';
import type { Node } from 'reactflow';

function getNodeCenter(node: Node) {
  return {
    x: node.position.x + (node.width || 0) / 2,
    y: node.position.y + (node.height || 0) / 2,
  };
}

function getParams(nodeA: Node, nodeB: Node) {
  if (!nodeA || !nodeB) {
    throw new Error('Nodes cannot be null or undefined');
  }

  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position;

  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

function getHandleCoordsByPosition(node: Node, handlePosition: Position) {
  if (!node) {
    throw new Error('Node cannot be null or undefined');
  }

  const handle = node[internalsSymbol]?.handleBounds?.source?.find(
    (h) => h.position === handlePosition,
  );

  if (!handle) {
    // TODO: implement logging service
    // console.warn(
    //   `Handle not found for position ${handlePosition}. Using node center as fallback.`
    // );
    return [
      node.position.x + (node.width || 0) / 2,
      node.position.y + (node.height || 0) / 2,
    ];
  }

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.position.x + handle.x + offsetX;
  const y = node.position.y + handle.y + offsetY;

  return [x, y];
}

export function getEdgeParams(source: Node, target: Node) {
  if (!source || !target) {
    throw new Error('Source and target nodes cannot be null or undefined');
  }

  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}
