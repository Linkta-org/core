import type { Types } from 'mongoose';

export type UserInput = {
  _id?: Types.ObjectId;
  id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  input: string;
  linktaFlowId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
