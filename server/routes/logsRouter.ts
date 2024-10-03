import { Router } from 'express';
import type { Request, Response } from 'express';
import createLogsController from '@controllers/logsController';
import createLogsService from '@/services/logsService';
import Log4js from 'log4js';

const logsRouter = Router();
const logger = Log4js.getLogger('[LOGS ROUTER]');

// Instantiate the services
const logsService = createLogsService();

// Instantiate the controller with the services
const logsController = createLogsController(logsService);

/**
 * @route POST /v1/logs
 * @description Fetches logs by date range.
 * @returns {Object} 200 - { logs }
 */
logsRouter.post(
  '/',
  logsController.getLogsByDateRange,
  (_: Request, res: Response) => {
    logger.debug('Sending logs by date range');
    return res.status(200).json({
      logs: res.locals.logs,
    });
  },
);

export default logsRouter;
