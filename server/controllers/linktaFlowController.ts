import type { Request, Response, NextFunction } from 'express';
import { createError } from '@middleware/errorHandling';
import log4js from 'log4js';
import mongoose from 'mongoose';
import type createLinktaFlowService from '@/services/linktaFlowService';
import type { CustomNode, CustomEdge } from '@/types';

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

      if (linktaFlow) {
        const { _id, nodes, edges } = linktaFlow;

        const mappedNodes = nodes.map((node: CustomNode) => ({
          ...node._doc,
          id: node._id,
          _id: undefined,
        }));

        const mappedEdges = edges.map((edge: CustomEdge) => ({
          ...edge._doc,
          id: edge._id,
          _id: undefined,
        }));

        res.locals.linktaFlow = {
          id: _id,
          userInputId,
          nodes: mappedNodes,
          edges: mappedEdges,
        };
      }

      next();
    } catch (error) {
      logger.error('Error fetching LinktaFlow for userInputId', error);
      const methodError = createError(
        'fetchLinktaFlow',
        'linktaFlowController',
        'Failed to fetch LinktaFlow',
        error,
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

      const methodError = createError(
        'updateLinktaFlow',
        'linktaFlowController',
        'Failed to update LinktaFlow',
        error,
      );
      return next(methodError);
    }
  };

  return { fetchLinktaFlow, updateLinktaFlow };
};

export default createLinktaFlowController;
