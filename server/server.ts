import express from 'express';
import { getEnv } from './utils/environment';
import { globalErrorHandler } from './middleware/errorHandling';

import type { Express, Request, Response } from 'express';
import { Server } from 'http';

getEnv();

/**
 * Start the server.
 */
async function startServer() {
  const app: Express = express();
  const PORT = process.env.PORT || 3000;

  connectToDatabase();

  /**
   * Test route for the server. This should direct to the frontend.
   */
  app.get('/', (_: Request, res: Response) => {
    res.send({ message: 'Hello from the Backend!' });
  });

  /**
   * Routes.
   */

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
function connectToDatabase() {
  // connect to the database
}

/**
 * Start the server.
 */
startServer();
