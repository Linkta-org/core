import type { Node, Edge, Viewport } from 'reactflow';

type LinktaFlow = {
  userId?: string;
  nodes: Node[];
  edges: Edge[];
  userInputId?: string;
  viewport?: Viewport;
};

export default LinktaFlow;
