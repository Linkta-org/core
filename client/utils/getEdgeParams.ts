// import { Position, internalsSymbol } from 'reactflow';
import type { Node } from 'reactflow';
import { DEFAULT_NODE_HEIGHT } from '@utils/constants';

function getNodeCenter(node: Node) {
  return {
    x: node.position.x + (node.width || 0) / 2,
    y: node.position.y + (node.height || 0) / 2,
  };
}

function getParams(nodeId: Node, nodeType: string) {
  if (!nodeId || !nodeType) {
    throw new Error('Nodes cannot be null or undefined');
  }

  const centerA = getNodeCenter(nodeId);

  let position;

  if (nodeType === 'source') {
    position = [centerA.x, centerA.y + DEFAULT_NODE_HEIGHT / 2];
  } else {
    position = [centerA.x, centerA.y - DEFAULT_NODE_HEIGHT / 2];
  }

  //const [x, y] = getHandleCoordsByPosition(nodeId, position);
  return [...position];
}

// function getHandleCoordsByPosition(node: Node, handlePosition: Position) {
//   if (!node) {
//     throw new Error('Node cannot be null or undefined');
//   }

//   const handle = node[internalsSymbol]?.handleBounds?.source?.find(
//     (h) => h.position === handlePosition,
//   );

//   if (!handle) {
//     // TODO: implement logging service
//     // console.warn(
//     //   `Handle not found for position ${handlePosition}. Using node center as fallback.`
//     // );
//     return [
//       node.position.x + (node.width || 0) / 2,
//       node.position.y + (node.height || 0) / 2,
//     ];
//   }

//   let offsetX = handle.width / 2;
//   let offsetY = handle.height / 2;

//   switch (handlePosition) {
//     case Position.Left:
//       offsetX = 0;
//       break;
//     case Position.Right:
//       offsetX = handle.width;
//       break;
//     case Position.Top:
//       offsetY = 0;
//       break;
//     case Position.Bottom:
//       offsetY = handle.height;
//       break;
//   }

//   const x = node.position.x + handle.x + offsetX;
//   const y = node.position.y + handle.y + offsetY;

//   return [x, y];
// }

export function getEdgeParams(source: Node, target: Node) {
  if (!source || !target) {
    throw new Error('Source and target nodes cannot be null or undefined');
  }

  const [sx, sy] = getParams(source, 'source');
  const [tx, ty] = getParams(target, 'target');

  return {
    sx,
    sy,
    tx,
    ty,
  };
}
