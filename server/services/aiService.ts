import { startGeneration } from '@/server/models/GeminiModel';
import { type Content } from '@google/generative-ai';
import { createError } from '@/server/middleware/errorHandling';

class AIService {
  public async generateInitialResponse(userInput: string): Promise<string> {
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
  }
}

export default AIService;
