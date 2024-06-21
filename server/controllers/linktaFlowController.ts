import type { Request, Response, NextFunction } from 'express';
import { createError } from '@middleware/errorHandling';
import log4js from 'log4js';
import mongoose from 'mongoose';
import type createLinktaFlowService from '@/services/linktaFlowService';

const logger = log4js.getLogger('[LinktaFlow Controller]');

/**
 * Creates the LinktaFlow controller.
 * @param {ReturnType<typeof createLinktaFlowService>} linktaFlowService - The LinktaFlow service instance.
 * @returns {object} The LinktaFlow controller with methods to fetch and update LinktaFlows.
 */
const createLinktaFlowController = (
  linktaFlowService: ReturnType<typeof createLinktaFlowService>
) => {
  const privateLinktaFlowService = linktaFlowService;
  /**
   * Fetches a specific LinktaFlow by userInputId.
   */
  const fetchLinktaFlow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userInputId = req.params.userInputId;
      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      const linktaFlow =
        await privateLinktaFlowService.fetchLinktaFlow(userInputObjectId);

      res.locals.linktaFlow = linktaFlow;

      next();
    } catch (error) {
      logger.error('Error fetching LinktaFlow for userInputId', error);
      const methodError = createError(
        'fetchLinktaFlow',
        'linktaFlowController',
        'Failed to fetch LinktaFlow',
        error
      );
      return next(methodError);
    }
  };

  /**
   * Updates a specific LinktaFlow.
   */
  const updateLinktaFlow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const linktaFlowId = req.params.linktaFlowId;
      const updatedLinktaFlow = req.body;

      const linktaFlowObjectId = new mongoose.Types.ObjectId(linktaFlowId);
      await privateLinktaFlowService.updateLinktaFlow(
        linktaFlowObjectId,
        updatedLinktaFlow
      );

      res.locals.message = `Linkta Flow updated successfully on ${new Date().toISOString()}.`;

      next();
    } catch (error) {
      logger.error('Error updating LinktaFlow for linktaFlowId', error);

      const methodError = createError(
        'updateLinktaFlow',
        'linktaFlowController',
        'Failed to update LinktaFlow',
        error
      );
      return next(methodError);
    }
  };

  return { fetchLinktaFlow, updateLinktaFlow };
};

export default createLinktaFlowController;
