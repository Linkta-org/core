import LinktaFlowModel from '@/models/LinktaFlowModel';
import { createError } from '@/middleware/errorHandling';
import type { Types } from 'mongoose';
import UserInputModel from '@/models/UserInputModel';
import type { LinktaFlow } from '@/types';
import type { Node, Edge } from 'reactflow';
import log4js from 'log4js';

const logger = log4js.getLogger('[LinktaFlow Service]');

/**
 * Creates a service for managing Linkta flows.
 * @returns {object} LinktaFlow service with various methods
 */
const createLinktaFlowService = () => {
  /**
   * Creates a new Linkta flow.
   */
  const createLinktaFlow = async (
    userId: Types.ObjectId,
    userInputId: Types.ObjectId,
    nodes: Node[],
    edges: Edge[],
  ): Promise<LinktaFlow> => {
    try {
      logger.debug('Creating LinktaFlow with data:', {
        userId,
        userInputId,
        nodes,
        edges,
      });

      const linktaFlowData = {
        userId,
        userInputId,
        nodes,
        edges,
      };

      // Create LinktaFlow in DB
      const newLinktaFlow = await LinktaFlowModel.create(linktaFlowData);

      // Update userInput with the corresponding linktaFlowId
      await UserInputModel.findByIdAndUpdate(userInputId, {
        $set: { linktaFlowId: newLinktaFlow._id },
      });

      return newLinktaFlow;
    } catch (error) {
      logger.error('Error creating LinktaFlow', error);
      const methodError = createError(
        'createLinktaFlow',
        'LinktaFlowService',
        'Error creating LinktaFlow.',
        error,
      );
      throw methodError;
    }
  };

  /**
   * Deletes a Linkta flow by user input ID.
   */
  const deleteLinktaFlowByUserInputId = async (
    userInputId: Types.ObjectId,
  ): Promise<LinktaFlow | null> => {
    try {
      logger.debug('Deleting LinktaFlow for userInputId:', userInputId);
      // Delete LinktaFlow in DB
      const deletedLinktaFlow = await LinktaFlowModel.findOneAndDelete({
        userInputId,
      });

      return deletedLinktaFlow;
    } catch (error) {
      logger.error('Error deleting LinktaFlow', error);
      const methodError = createError(
        'deleteLinktaFlowByUserInputId',
        'LinktaFlowService',
        'Error deleting LinktaFlow data.',
        error,
      );
      throw methodError;
    }
  };

  /**
   * Fetches a Linkta flow by user input ID.
   */
  const fetchLinktaFlowByUserInputId = async (
    userInputId: Types.ObjectId,
  ): Promise<LinktaFlow | null> => {
    try {
      logger.debug('Fetching LinktaFlow for userInputId:', userInputId);

      const linktaFlow = await LinktaFlowModel.findOne({
        userInputId,
      });

      if (!linktaFlow) {
        logger.warn('LinktaFlow not found.');
        return null;
      }

      return linktaFlow;
    } catch (error) {
      logger.error('Error fetching LinktaFlow', error);
      throw createError(
        'fetchLinktaFlow',
        'LinktaFlowService',
        'Error fetching LinktaFlow',
        error,
      );
    }
  };

  /**
   * Updates a Linkta flow by its ID.
   */
  const updateLinktaFlowById = async (
    linktaFlowId: Types.ObjectId,
    updatedLinktaFlow: Partial<LinktaFlow>,
  ): Promise<LinktaFlow | null> => {
    try {
      logger.debug('Updating LinktaFlow for linktaFlowId:', linktaFlowId);

      const linktaFlow = await LinktaFlowModel.findByIdAndUpdate(
        linktaFlowId,
        updatedLinktaFlow,
        { new: true },
      );

      if (!linktaFlow) {
        logger.warn(`LinktaFlow not found`);
        throw new Error(
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.',
        );
      }

      return linktaFlow;
    } catch (error) {
      logger.error('Error updating LinktaFlow', error);
      throw createError(
        'updateLinktaFlow',
        'LinktaFlowService',
        'Error updating LinktaFlow',
        error,
      );
    }
  };

  return {
    createLinktaFlow,
    deleteLinktaFlowByUserInputId,
    fetchLinktaFlowByUserInputId,
    updateLinktaFlowById,
  };
};

export default createLinktaFlowService;
