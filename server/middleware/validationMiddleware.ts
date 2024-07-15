import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';
import { formatZodErrorMessages } from '@utils/helpers';
import { ValidationError } from '@/utils/customErrors';

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
  target: ValidationTarget,
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessage = formatZodErrorMessages(err);
        next(new ValidationError(`Validation Error: ${errorMessage}`));
      } else {
        next(new ValidationError());
      }
    }
  };
};

export default validationMiddleware;
