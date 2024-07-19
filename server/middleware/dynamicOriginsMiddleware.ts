import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import { getEnv } from '@utils/environment';

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

  try {
    const validOrigin = originsWhitelist.find(
      (origin: string) => origin === requestOrigin,
    );
    if (validOrigin !== undefined) {
      corsOptions.origin = validOrigin;
    } else {
      throw new Error();
    }
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export default verifyOrigin;
