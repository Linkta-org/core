import type { Node, Edge } from 'reactflow';

type LinktaFlow = {
  userId?: string;
  nodes: Node[];
  edges: Edge[];
  userInputId?: string;
};

export default LinktaFlow;
