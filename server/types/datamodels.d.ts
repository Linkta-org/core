import type { Types } from 'mongoose';
import type { Node, Edge } from 'reactflow';

export type User = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserInput = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  input: string;
  linktaFlowId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type LinktaFlow = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  nodes: Node[];
  edges: Edge[];
  userInputId: Types.ObjectId;
};
