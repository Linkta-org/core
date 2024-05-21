import { Schema, model, Types } from 'mongoose';
import type { User } from '@/server/types/datamodels';

const userSchema = new Schema<User>({
  firstName: { type: String, required: true, minlength: 3, maxlength: 30, trim: true },
  lastName: { type: String },
  linktaFlows: [{ type: Types.ObjectId, ref: 'LinktaFlow' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<User>('User', userSchema);