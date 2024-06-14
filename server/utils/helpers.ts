import type { ZodError } from 'zod';

// Formats Zod error messages into a single string.
export const formatZodErrorMessages = (error: ZodError): string => {
  return error.errors.map((e) => e.message).join('; ');
};
