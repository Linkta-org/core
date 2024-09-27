import type { Types } from 'mongoose';

export type UserInput = {
  _id: Types.ObjectId;
  userId: string;
  title: string;
  input: string;
  linktaFlowId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LinktaFlow = {
  _id: Types.ObjectId;
  userId: string;
  nodes: CustomNode[];
  edges: CustomEdge[];
  userInputId: string;
};
