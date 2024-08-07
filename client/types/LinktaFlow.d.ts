import type { Node, Edge, Viewport } from 'reactflow';
type LinktaFlow = {
  id: string;
  userInputId?: string;
  userId?: string;
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
};

export default LinktaFlow;
