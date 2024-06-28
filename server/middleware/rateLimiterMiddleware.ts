import { rateLimit } from 'express-rate-limit';
import log4js from 'log4js';

const { getLogger } = log4js;
const logger = getLogger('[RATE LIMITER]');

/**
 * Express rate limiter configuration
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 60, // Limit each IP to 60 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: 'Rate limit reached. You have sent too many requests!', // The message sent in the response to the client
  handler: (_req, res, _next, options) => {
    // override the default handler to add the server-side log
    logger.error('Rate Limiter Hit!');
    res.status(options.statusCode).send(options.message);
  },
});

export default limiter;
