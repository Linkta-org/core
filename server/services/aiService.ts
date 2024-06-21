import { startGeneration } from '@/models/GeminiModel';
import { type Content } from '@google/generative-ai';
import { createError } from '@/middleware/errorHandling';

/**
 * Creates AI service to interact with generative AI models.
 * @returns {object} AI service with methods to generate responses.
 */
const createAIService = () => {
  /**
   * Generates the initial response from the AI model based on user input.
   */
  const generateInitialResponse = async (
    userInput: string
  ): Promise<string> => {
    const history: Content[] = [];
    try {
      if (!userInput) {
        throw new Error('Invalid user input');
      }

      const response = await startGeneration(history, userInput);
      // TODO: add linktaflow validation + retry mechanism

      return response;
    } catch (error) {
      const methodError = createError(
        'generateInitialResponse',
        'AIService',
        'Error generating response from AI.',
        error
      );
      throw methodError;
    }
  };

  return { generateInitialResponse };
};

export default createAIService;
