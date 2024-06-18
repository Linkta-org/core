import { Schema, model } from 'mongoose';
import type { UserInput } from '@/types/datamodels';
import userInputSanitizationSchema from '@zod/sanitizeInput';
import { formatZodErrorMessages } from '@utils/helpers';

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

// Pre-save hook to sanitize the 'input' field with Zod
userInputSchema.pre<UserInput>('save', async function (next) {
  const result = userInputSanitizationSchema.safeParse({
    input: this.input,
  });

  if (!result.success) {
    const errorMessage = formatZodErrorMessages(result.error);
    return next(new Error(`Sanitization failed: ${errorMessage}`));
  }

  this.input = result.data.input;

  if (!this.title) {
    this.title = this.input;
  }
  next();
});

export default model<UserInput>('UserInput', userInputSchema);
