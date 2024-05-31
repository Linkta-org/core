import { Schema, model } from 'mongoose';
import type { UserInput } from '@/server/types/datamodels';
import userInputSanitizationSchema from '@/utils/sanitizeInput';

const userInputSchema = new Schema<UserInput>({
  input: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  linktaFlows: [{ type: Schema.Types.ObjectId, ref: 'LinktaFlow' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

<<<<<<< HEAD
export default model('UserInput', userInputSchema);
=======
// Pre-save hook to sanitize the 'input' field with Zod
userInputSchema.pre<UserInput>('save', async function (next) {
  const result = userInputSanitizationSchema.safeParse({
    input: this.input,
  });

  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message).join(',');
    return next(new Error(`Sanitization failed: ${errors}`));
  }

  this.input = result.data.input;
  next();
});

export default model<UserInput>('UserInput', userInputSchema);
>>>>>>> dev
