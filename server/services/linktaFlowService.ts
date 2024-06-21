import LinktaFlowModel from '@/models/LinktaFlowModel';
import { createError } from '@/middleware/errorHandling';
import type { Types } from 'mongoose';
import UserInputModel from '@/models/UserInputModel';
import type { LinktaFlow } from '@/types';
import type { Node, Edge } from 'reactflow';

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
      // Delete LinktaFlow in DB
      const deletedLinktaFlow = await LinktaFlowModel.findOneAndDelete({
        userInputId,
      });

      return deletedLinktaFlow;
    } catch (error) {
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
  const fetchLinktaFlow = async (
    userInputId: Types.ObjectId
  ): Promise<LinktaFlow | null> => {
    try {
      const linktaFlow = await LinktaFlowModel.findOne({
        userInputId,
      });

      if (!linktaFlow) {
        throw new Error(
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.'
        );
      }

      return linktaFlow;
    } catch (error) {
      throw createError(
        'fetchLinktaFlow',
        'LinktaFlowService',
        'Error fetching LinktaFlow',
        error
      );
    }
  };

  /**
   * Updates a Linkta flow by its ID.
   */
  const updateLinktaFlow = async (
    linktaFlowId: Types.ObjectId,
    updatedLinktaFlow: Partial<LinktaFlow>
  ): Promise<LinktaFlow | null> => {
    try {
      const linktaFlow = await LinktaFlowModel.findByIdAndUpdate(
        linktaFlowId,
        updatedLinktaFlow,
        { new: true }
      );

      if (!linktaFlow) {
        throw new Error(
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.'
        );
      }

      return linktaFlow;
    } catch (error) {
      throw createError(
        'updateLinktaFlow',
        'LinktaFlowService',
        'Error updating LinktaFlow',
        error
      );
    }
  };

  return {
    createLinktaFlow,
    deleteLinktaFlowByUserInputId,
    fetchLinktaFlow,
    updateLinktaFlow,
  };
};

export default createLinktaFlowService;
