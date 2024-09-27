import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import mongoose from 'mongoose';
import type createLinktaFlowService from '@/services/linktaFlowService';
import {
  CustomError,
  InternalServerError,
  LinktaFlowNotFoundError,
} from '@/utils/customErrors';

const logger = log4js.getLogger('[LinktaFlow Controller]');

/**
 * Creates the LinktaFlow controller.
 * @param {ReturnType<typeof createLinktaFlowService>} linktaFlowService - The LinktaFlow service instance.
 * @returns {object} The LinktaFlow controller with methods to fetch and update LinktaFlows.
 */
const createLinktaFlowController = (
  linktaFlowService: ReturnType<typeof createLinktaFlowService>,
) => {
  const privateLinktaFlowService = linktaFlowService;
  /**
   * Fetches a specific LinktaFlow by userInputId.
   */
  const fetchLinktaFlow = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(
        'Fetching LinktaFlow for userInputId:',
        req.params.userInputId,
      );

      const userInputId = req.params.userInputId;

      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      const linktaFlow =
        await privateLinktaFlowService.fetchLinktaFlowByUserInputId(
          userInputObjectId,
        );

      logger.debug('linktaflow', linktaFlow);

      if (linktaFlow) {
        const { nodes, edges } = linktaFlow;

        res.locals.linktaFlow = {
          userInputId,
          nodes,
          edges,
        };
      } else {
        throw new LinktaFlowNotFoundError();
      }

      next();
    } catch (error) {
      logger.error('Error fetching LinktaFlow for userInputId', error);

      if (error instanceof CustomError) {
        next(error);
      } else {
        next(new InternalServerError());
      }
    }
  };

  /**
   * Updates a specific LinktaFlow.
   */
  const updateLinktaFlow = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      logger.debug(
        'Updating LinktaFlow for linktaFlowId:',
        req.params.linktaFlowId,
      );

      const linktaFlowId = req.params.linktaFlowId;
      const { updatedLinktaFlow } = req.body;

      const linktaFlowObjectId = new mongoose.Types.ObjectId(linktaFlowId);
      await privateLinktaFlowService.updateLinktaFlowById(
        linktaFlowObjectId,
        updatedLinktaFlow,
      );

      res.locals.message = 'Linkta Flow updated successfully.';

      next();
    } catch (error) {
      logger.error('Error updating LinktaFlow for linktaFlowId', error);

      if (error instanceof CustomError) {
        next(error);
      } else {
        next(new InternalServerError());
      }
    }
  };

  return { fetchLinktaFlow, updateLinktaFlow };
};

export default createLinktaFlowController;
