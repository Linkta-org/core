import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';
import { formatZodErrorMessages } from '@utils/helpers';

type ValidationTarget = 'body' | 'query' | 'params' | 'headers';

type RequestPart =
  | Request['body']
  | Request['query']
  | Request['params']
  | Request['headers'];

/**
 * Middleware to validate request parts using a Zod schema.
 * @param {ZodSchema<RequestPart>} schema - The Zod schema to validate against.
 * @param {ValidationTarget} target - The part of the request to validate (body, query, params, headers).
 * @returns {(req: Request, res: Response, next: NextFunction) => void} An Express middleware function.
 */
const validationMiddleware = (
  schema: ZodSchema<RequestPart>,
  target: ValidationTarget
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = formatZodErrorMessages(err);
        return res
          .status(400)
          .json({ message: `Validation Error: ${errorMessage}` });
      }
      return res.status(400).json({
        message:
          'Invalid input provided. Please ensure your request meets the required format and constraints.',
      });
    }
  };
};

export default validationMiddleware;
