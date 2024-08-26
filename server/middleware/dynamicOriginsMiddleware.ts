import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import { getEnv } from '@utils/environment';
import { ValidationError } from '@utils/customErrors';

getEnv();

type CorsOptions = {
  origin: string | undefined;
  methods: string;
  allowedHeaders: string[];
};

const logger = log4js.getLogger('[CORS Middleware]');

const originsWhitelist = process.env.ALLOWED_ORIGINS!.split(', ');

export const corsOptions: CorsOptions = {
  origin: undefined,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
};

const verifyOrigin = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-request-id',
  );
  const requestOrigin = req.headers.origin;
  logger.debug('REQUEST ORIGIN: ', requestOrigin);

  const validOrigin = originsWhitelist.find(
    (origin: string) => origin === requestOrigin,
  );

  if (validOrigin !== undefined) {
    res.setHeader('Access-Control-Allow-Origin', validOrigin);
    corsOptions.origin = validOrigin;
  } else {
    const validationError = new ValidationError(`Origin not whitelisted.`);
    logger.error(validationError, `Request Origin: ${requestOrigin}`);
    throw validationError;
  }
  next();
};

export default verifyOrigin;
