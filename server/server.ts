import express from 'express';
import cors from 'cors';
import log4js from 'log4js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { globalErrorHandler } from '@middleware/errorHandling';
import linktaFlowRouter from '@routes/linktaFlowRouter';
import log4jsConfig from '@/utils/log4js.config.json';
import { getEnv } from '@utils/environment';
import userInputRouter from '@routes/userInputRouter';
import authRouter from '@routes/authRouter';
import type { Express, Response } from 'express';
import type { Server } from 'http';

getEnv();

/**
 * configure log4js and create an instance of logger
 * see /controllers/userInputController for usage example
 */
const { getLogger, configure, isConfigured } = log4js;
log4jsConfig.categories.default.level = process.env.LOG_LEVEL || 'info';
configure(log4jsConfig);
const logger = getLogger('[Linkta Server]');
isConfigured() && logger.info('Log4JS is configured!');

const uri = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', false);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-user-id',
    'x-request-id',
  ],
};

/**
 * Start the server.
 */
function startServer() {
  const app: Express = express();
  const PORT = process.env.PORT || 3000;

  if (!uri) {
    throw new Error('Missing DB connection string!');
  }

  // eslint-disable-next-line no-console -- TODO: implement logging service to replace console.dir and remove this line to re-enable eslint
  connectToDatabase(uri || '').catch(console.dir);

  app.use(bodyParser.json());

  app.use(cors(corsOptions));

  /**
   * Server health check route handler
   */
  app.get('/', (_req, res: Response) => {
    logger.debug('HIT / handler');
    res.send({ message: 'Hello from the Server!' });
  });

  /**
   * Routers
   */
  app.use('/v1/inputs', userInputRouter, () => {
    logger.debug('HIT v1/inputs handler');
  });

  app.use('/v1/flows', linktaFlowRouter, () => {
    logger.debug('HIT v1/flows handler');
  });

  app.use('/v1/auth', authRouter, () => {
    logger.debug('HIT v1/auth handler');
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
  app.use(globalErrorHandler);

  /**
   * Start the server.
   */
  const server: Server = app.listen(PORT, () => {
    logger.info(
      `Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`,
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
