/*
what are the inputs users are creating?
1. signup account
   a. first_name
   b. last_name
   c. email
   d. password
2. user input
  a. string of topic(mvp) 
*/

import validator from 'validator';

interface SanitizeOptions {
  trim: boolean;
  escapeHTML: boolean;
  sanitizeEmail: boolean;
}

/**
 * Sanitizes input string by trimming whitespace, escaping HTML special characters and normalize email address.
 * @param {string} str - The string to sanitize.
 * @param {SanitizeOptions} options - Configuration options for sanitization.
 * @return {string} The sanitized string.
 */

export const sanitizeInput = (
  str: string,
  options: SanitizeOptions
): string => {
  let result = str;
  if (options.trim) {
    result = validator.trim(result);
  }
  if (options.escapeHTML) {
    result = validator.escape(result);
  }
  if (options.sanitizeEmail) {
    const email = validator.normalizeEmail(result);
    if (email) {
      result = email;
    } else {
      throw new Error('Please provide a valid email address');
    }
  }
  return result;
};
