import LinktaFlowModel from '@/models/LinktaFlowModel';
import { createError } from '@/middleware/errorHandling';
import type { Types } from 'mongoose';
import User from '@/models/UserModel';
import UserInput from '@/models/UserInputModel';
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

      // Update user's linktaFlows array
      await User.findByIdAndUpdate(userId, {
        $push: { linktaFlows: newLinktaFlow._id },
      });

      // Update userInput with the corresponding linktaFlowId
      await UserInput.findByIdAndUpdate(userInputId, {
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

  return {
    createLinktaFlow,
    deleteLinktaFlowByUserInputId,
  };
};

export default createLinktaFlowService;
