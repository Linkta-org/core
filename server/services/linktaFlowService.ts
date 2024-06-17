import LinktaFlow from '@/server/models/LinktaFlowModel';
import { createError } from '@/server/middleware/errorHandling';
import type { Types } from 'mongoose';
import User from '@server/models/UserModel';
import UserInput from '@server/models/UserInputModel';
import type { LinktaFlow as ILinktaFlow } from '@/server/types';
import type createAIService from './aiService';

const createLinktaFlowService = (

  aiService: ReturnType<typeof createAIService>
) => {
  // Private services
  const _aiService = aiService;

  const createLinktaFlowFromInput = async (
    userId: Types.ObjectId,
    userInputId: Types.ObjectId,
    userInput: string
  ): Promise<ILinktaFlow> => {
    try {
      const aiResponse = await _aiService.generateInitialResponse(userInput);

      const parsedAiResponse = JSON.parse(aiResponse);

      const { nodes, edges } = parsedAiResponse;

      const linktaFlowData = {
        userInputId,
        userId,
        nodes,
        edges,
      };

      // Create LinktaFlow in DB
      const newLinktaFlow = await LinktaFlow.create(linktaFlowData);

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
        error
      );
      throw methodError;
    }
  };

  const deleteLinktaFlowByUserInputId = async (
    userInputId: Types.ObjectId
  ): Promise<ILinktaFlow | null> => {
    try {
      const deletedLinktaFlow = await LinktaFlow.findOneAndDelete({
        userInputId,
      });

      return deletedLinktaFlow;
    } catch (error) {
      const methodError = createError(
        'deleteLinktaFlowByUserInputId',
        'LinktaFlowService',
        'Error deleting LinktaFlow data.',
        error
      );
      throw methodError;
    }
  };

  return {
    createLinktaFlowFromInput,
    deleteLinktaFlowByUserInputId,
  };
};

export default createLinktaFlowService;
