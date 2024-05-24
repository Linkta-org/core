import { z } from 'zod';

//function to check for special HTML chars
const hasHtmlChars = (val: string) => {
  const specialCharsRegex = /[<>]/;
  return !specialCharsRegex.test(val);
};
const userInputValidationSchema = z.object({
  input: z
    .string()
    .trim()
    .min(3, 'Input must be at least 3 characters long')
    .max(30, { message: 'Input can be up to 30 characters long' })
    .refine((val) => hasHtmlChars(val), {
      message: 'Input includes special HTML characters',
    }),
});

export type UserInputValidation = z.infer<typeof userInputValidationSchema>;
export default UserInputValidation;