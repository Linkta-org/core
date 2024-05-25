import { Schema, model, Types } from 'mongoose';
import type { UserType } from '@/server/types/datamodels';

const userSchema = new Schema<UserType>({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  lastName: { type: String, required: true },
  userInputs: [{ type: Types.ObjectId, ref: 'UserInput' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<UserType>('User', userSchema);
