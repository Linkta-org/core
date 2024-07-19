import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';

type CorsOptions = {
  origin: string | undefined;
  methods: string[];
  allowedHeaders: string[];
};

const logger = log4js.getLogger('[CORS Middleware]');

const originsWhitelist = [
  'http://localhost:5173',
  'https://linkta.io',
  'https://linkta-core.netlify.app',
];

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
