import type { Types } from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  firebaseId: string;
  treeIds: [{ type: Types.ObjectId; ref: TreeNode }];
};

export type UserInput = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  input: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TreeNode = {
  _id: Types.ObjectId;
  content: string;
  childNodes: [{ type: Types.ObjectId; ref: TreeNode }];
  depth: number;
};

