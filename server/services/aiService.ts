import { startGeneration } from '@/models/GeminiModel';
import type { Content } from '@google/generative-ai';
import { InternalServerErrorGenAI } from '@utils/customErrors';
import log4js from 'log4js';

const logger = log4js.getLogger('[aiService]');

/**
 * Creates AI service to interact with generative AI models.
 * @returns {object} AI service with methods to generate responses.
 */
const createAIService = () => {
  /**
   * Generates the initial response from the AI model based on user input.
   */
  const generateInitialResponse = async (
    userInput: string,
  ): Promise<string> => {
    const history: Content[] = [];
    try {
      logger.debug('Starting to generate initial response', userInput);

      if (!userInput) {
        logger.error('Invalid user input');
        throw new Error('Invalid user input');
      }

      return await startGeneration(history, userInput);
    } catch (error) {
      logger.error('Error generating initial response from aiService.', error);

      throw new InternalServerErrorGenAI();
    }
  };

  return { generateInitialResponse };
};

export default createAIService;
