import { z } from 'zod';

//function to check for special HTML chars
const hasHtmlChars = (val: string) => {
  const specialCharsRegex = /[<>]/;
  return !specialCharsRegex.test(val);
};

/**
 * Trims and replaces multiple whitespace characters with a single space.
 * @param {string} input - The string to process.
 * @returns {string} The processed string.
 */

const removeExtraWhiteSpaces = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Escapes HTML special characters in a string.
 * @param {string} input - The string to process.
 * @returns {string} The processed string with escaped HTML characters.
 */
const escapeHTML = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;');
};

// Combined schema for user input
export const userInputValidationSchema = {
  id: z.string().min(1, 'Document ID is required'),
  input: z
    .string()
    .trim()
    .min(3, 'Input must be at least 3 characters long')
    .max(100, { message: 'Input can be up to 100 characters long' })
    .refine((val) => hasHtmlChars(val), {
      message: 'Input includes special HTML characters',
    }),
  title: z.string().min(1, 'Title is required'),
};

// Sanitization schema for user input
export const userInputSanitizationSchema = z.object({
  input: z.string().transform(removeExtraWhiteSpaces).transform(escapeHTML),
});

// Function to sanitize user input
export const sanitizeUserInput = (input: string): string => {
  return userInputSanitizationSchema.parse({ input }).input;
};
