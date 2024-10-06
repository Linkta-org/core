import { z } from 'zod';

//function to check for special HTML chars
const hasHtmlChars = (val: string) => {
  const specialCharsRegex = /[<>]/;
  return !specialCharsRegex.test(val);
};

// Validation schema for user input
export const userInputInputSchema = z.object({
  input: z
    .string()
    .trim()
    .min(3, 'Input must be between 3 and 100 characters in length!')
    .max(100, {
      message: 'Input must be between 3 and 100 characters in length!',
    })
    .refine((val) => hasHtmlChars(val), {
      message:
        'Input must not include special HTML characters such as "<" or ">" !',
    }),
});

// Validation schema for input title
export const userInputTitleSchema = z.object({
  title: z
    .string()
    .min(1, 'Input title is required')
    .max(15, {
      message: 'Title must be less than 15 characters in length',
    })
    .refine((val) => hasHtmlChars(val), {
      message:
        'Input must not include special HTML characters such as "<" or ">" !',
    }),
});
