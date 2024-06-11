import userInputSanitizationSchema from '@/utils/sanitizeInput';
import userInputValidationSchema from './userInputValidation';

const userInputSchema = userInputSanitizationSchema.merge(
  userInputValidationSchema
);

export default userInputSchema;
