import express from 'express';
import cors from 'cors';
import log4js from 'log4js';
import mongoose from 'mongoose';
import type { Server } from 'http';
import bodyParser from 'body-parser';
import userRouter from '@routes/userRouter';
import type { Express, Response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import userInputRouter from '@routes/userInputRouter';
import linktaFlowRouter from '@routes/linktaFlowRouter';
import RateLimiter from '@middleware/rateLimiterMiddleware';
import { errorHandlerMiddleware } from '@middleware/errorHandling';
import verifyOrigin, {
  corsOptions,
} from '@middleware/dynamicOriginsMiddleware';
import log4jsConfig from '@/utils/log4js.config.json' with { type: 'json' };
import { getEnv } from '@utils/environment';

getEnv();

/**
 * configure log4js and create an instance of logger
 * see /controllers/userInputController for usage example
 */
const { getLogger, configure, isConfigured } = log4js;
log4jsConfig.categories.default.level = process.env.LOG_LEVEL || 'info';
configure(log4jsConfig);
const logger = getLogger('[SERVER]');
isConfigured() && logger.info('Log4JS is configured!');

const uri = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', false);

/**
 * Start the server.
 */
function startServer() {
  const app: Express = express();
  const PORT = process.env.PORT || 3000;

  // Apply the rate limiting middleware to all requests.
  app.use(RateLimiter);

  if (!uri) {
    throw new Error('Missing DB connection string!');
  }

  // eslint-disable-next-line no-console
  connectToDatabase(uri || '').catch(console.dir);

  /**
   * Server health check route handler
   */
  app.get('/', (_req, res: Response) => {
    logger.debug('HIT / handler');
    res.send({ message: 'Hello from the Server!' });
  });

  /**
   * Run these lines on every request
   */
  app.use(bodyParser.json());
  app.use(verifyOrigin);
  app.use(cors(corsOptions));

  /**
   * Routers
   */
  app.use('/v1/inputs', userInputRouter, () => {
    logger.debug('HIT v1/inputs handler');
  });

  app.use('/v1/flows', linktaFlowRouter, () => {
    logger.debug('HIT v1/flows handler');
  });

  app.use('/v1/users', userRouter, () => {
    logger.debug('HIT v1/users handler');
  });

  /**
   * Default route for unknown routes. This should be the last route.
   * There should be handling for this in the frontend.
   */
  app.use((_req, res: Response) => {
    res.status(404).send({ message: 'Route not found' });
  });

  /**
   * Global Error Handler. Place this at the end to catch all errors.
   */
  app.use(errorHandlerMiddleware);

  /**
   * Start the server.
   */
  const server: Server = app.listen(PORT, () => {
    logger.info(
      `Server is running on ${process.env.SERVER_BASE_URL}:${PORT} in ${process.env.NODE_ENV} mode.`,
    );
  });

  /**
   * Handle shutdown gracefully.
   */
  const shutdown = () => stopServer(server);
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

/**
 * Stop the server process.
 *
 * From PR #37, we should integrate the database disconnection here.
 *
 * https://github.com/Linkta-org/core/pull/37
 */
function stopServer(server: Server) {
  server.close(() => {
    logger.warn('Server stopped.');

    // disconnect from the database
    process.exit(0);
  });
}

/**
 * Connect to the database.
 *
 * This should return the connection so that stopServer can use it to disconnect.
 */
async function connectToDatabase(link: string) {
  const client = new MongoClient(link, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    logger.info(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
    await mongoose
      .connect(uri ?? '')
      .then(() => logger.info('MONGOOSE connected!'));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/**
 * Start the server.
 */
startServer();
