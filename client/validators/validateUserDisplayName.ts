import { z } from 'zod';

// Returns true if only alphabetic characters are present
const hasValidChars = (val: string) => {
  const validCharsRegex = /^[A-Za-z1-9]+(?:[ ][A-Za-z1-9]+)*$/;
  return validCharsRegex.test(val);
};

export const userDisplayNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name must be at least 1 character')
    .max(30, 'Name must be less than 30 characters')
    .refine((val) => hasValidChars(val), {
      message: 'Name must only contain alphanumeric characters!',
    }),
});
