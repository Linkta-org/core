import { z } from 'zod';

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

const userInputSanitizationSchema = z.object({
  input: z.string().transform(removeExtraWhiteSpaces).transform(escapeHTML),
});

export type UserInputSanitization = z.infer<typeof userInputSanitizationSchema>;
export default userInputSanitizationSchema;
