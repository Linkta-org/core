import { Schema, model } from 'mongoose';
import type { UserInput } from '@/types/datamodels';

const userInputSchema = new Schema<UserInput>(
  {
    userId: {
      type: String,
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
      type: String,
      ref: 'LinktaFlow',
    },
  },
  { timestamps: true },
);

export default model<UserInput>('UserInput', userInputSchema);
