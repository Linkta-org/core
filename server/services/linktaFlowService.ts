import LinktaFlow from '@/server/models/LinktaFlowModel';
import { createError } from '@/server/middleware/errorHandling';
import type { Types } from 'mongoose';
import User from '@server/models/UserModel';
import UserInput from '@server/models/UserInputModel';
import type IaiService from './aiService';

class LinktaFlowService {
  private aiService: IaiService;

  /**
   * Constructs a new LinktaFlowService instance.
   * @param {IaiService} aiService - The AI service used to generate initial responses.
   */
  constructor(aiService: IaiService) {
    this.aiService = aiService;
  }

  /**
   * Public method: Creates a LinktaFlow from user input.
   */
  public async createLinktaFlowFromInput(
    userId: Types.ObjectId,
    userInputId: Types.ObjectId,
    userInput: string
  ) {
    try {
      const aiResponse =
        await this.aiService.generateInitialResponse(userInput);

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
  }
}

export default LinktaFlowService;
