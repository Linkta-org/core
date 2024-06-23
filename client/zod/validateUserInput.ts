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
    .min(3, 'Input must be between 3 and 100 characters in length!')
    .max(100, { message: 'Input must be between 3 and 100 characters in length!' })
    .refine((val) => hasHtmlChars(val), {
      message: 'Input must not include special HTML characters such as "<" or ">" !',
    }),
});

export type UserInputValidation = z.infer<typeof userInputValidationSchema>;
export default userInputValidationSchema;
