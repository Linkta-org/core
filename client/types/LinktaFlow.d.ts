import type { Node, Edge } from 'reactflow';

type LinktaFlow = {
  id: string;
  userInputId?: string;
  userId?: string;
  nodes: Node[];
  edges: Edge[];
};

export default LinktaFlow;
