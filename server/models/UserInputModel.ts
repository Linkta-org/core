import { Schema, model } from 'mongoose';
import type { UserInput } from '@/types/userInput';

const userInputSchema = new Schema<UserInput>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    default: '',
  },
  input: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  linktaFlowId: {
    type: Schema.Types.ObjectId,
    ref: 'LinktaFlow',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<UserInput>('UserInput', userInputSchema);
