import type { Node, Edge } from 'reactflow';

type LinktaFlow = {
  _id: string;
  userId?: string;
  userInputId?: string;
  nodes: Node[];
  edges: Edge[];
};

export default LinktaFlow;
