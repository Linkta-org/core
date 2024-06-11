import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { getEnv } from '@server/utils/environment';
import { getLogger, configure, isConfigured } from 'log4js';
import type { Express, Request, Response } from 'express';
import type { Server } from 'http';
import cors from 'cors';

import log4jsConfig from '@server/utils/log4js.config.json';
import { globalErrorHandler } from '@server/middleware/errorHandling';
import userInput from './routes/userInput';

getEnv();
const uri = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', false);

log4jsConfig.categories.default.level = process.env.LOG_LEVEL || 'info';
configure(log4jsConfig);

const logger = getLogger('[Linkta Server]');
isConfigured() && logger.info('Log4JS is configured!');

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

  connectToDatabase(uri).catch(console.dir);

  app.use(bodyParser.json());

  app.use(cors(corsOptions));

  /**
   * Test route for the server. This should direct to the frontend.
   */
  app.get('/', (_: Request, res: Response) => {
    res.send({ message: 'Hello from the Backend!' });
  });

  /**
   * Routes.
   */

  app.use('/v1/inputs', userInput);

  /**
   * Default route for unknown routes. This should be the last route.
   * There should be handling for this in the frontend.
   */
  app.use((_: Request, res: Response) => {
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
    console.log(
      `Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`
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
    console.log('Server stopped.');

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
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    await mongoose
      .connect(uri ?? '')
      .then(() => console.log('MONGOOSE connected!'));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/**
 * Start the server.
 */
startServer();
