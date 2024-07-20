import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import { getEnv } from '@utils/environment';
import { ValidationError } from '@utils/customErrors';

getEnv();

type CorsOptions = {
  origin: string | undefined;
  methods: string[];
  allowedHeaders: string[];
};

const logger = log4js.getLogger('[CORS Middleware]');

const originsWhitelist = process.env.ALLOWED_ORIGINS!.split(', ');

export const corsOptions: CorsOptions = {
  origin: undefined,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
};

const verifyOrigin = (req: Request, _res: Response, next: NextFunction) => {
  const requestOrigin = req.headers.origin;

  const validOrigin = originsWhitelist.find(
    (origin: string) => origin === requestOrigin,
  );
  if (validOrigin !== undefined) {
    corsOptions.origin = validOrigin;
  } else {
    const validationError = new ValidationError(`Origin not whitelisted.`);
    logger.error(validationError, `Request Origin: ${requestOrigin}`);
    throw validationError;
  }
  next();
};

export default verifyOrigin;
