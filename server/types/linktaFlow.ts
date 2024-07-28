import type { Types } from 'mongoose';

type Node = {
  _id: Types.ObjectId;
  id: string;
  data: {
    label: string;
  };
};

type Edge = {
  _id: Types.ObjectId;
  id: string;
  source: string;
  target: string;
};

// Define the LinktaFlow type
export type LinktaFlow = {
  _id: Types.ObjectId;
  nodes: Node[];
  edges: Edge[];
  userInputId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
