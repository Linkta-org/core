import { Schema, model } from 'mongoose';
import type { UserInput } from '@/server/types/datamodels';
import userInputSanitizationSchema from '@/utils/sanitizeInput';

const userInputSchema = new Schema<UserInput>({
  input: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  linktaFlows: [{ type: Schema.Types.ObjectId, ref: 'LinktaFlow' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save hook to sanitize the 'input' field with Zod
userInputSchema.pre('save', (next) => {
  const userInput = this as unknown as Document & UserInput;
  const result = userInputSanitizationSchema.safeParse({
    input: userInput.input,
  });

  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message).join(',');
    return next(new Error(`Sanitization failed: ${errors}`));
  }

  userInput.input = result.data.input;
  next();
});

module.exports = model('UserInput', userInputSchema);
