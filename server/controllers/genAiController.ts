import createAI from '@/server/utils/aiFactory';
import { createError } from '@/server/middleware/errorHandling';

import type { Request, Response, NextFunction } from 'express';
import { type GenerativeAIModel } from '@server/types/index';
import { AIProvider } from '@server/types/index';

const genAIController = {
  /**
   * Generate a response from the AI.
   * The response is stored in res.locals.response
   *
   * @param req The request object
   * @param res The response object
   * @param next The next function
   * @return void
   */
  async generateResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const AI: AIProvider = AIProvider.Gemini;

    const prompt = req.body.prompt;

    try {
      const AIConnection = genAIController.createConnection(AI);

      const response = await AIConnection.generateResponse(prompt);

      res.locals.response = response;

      return next();
    } catch (err: unknown) {
      const methodError = createError(
        'generateResponse',
        'genAIController',
        'Error generating response from AI.',
        err
      );

      return next(methodError);
    }
  },

  /**
   * Create a connection to an AI API
   *
   * @param AI The type of AI to connect to
   */
  createConnection(AI: AIProvider): GenerativeAIModel {
    const AIConnection = createAI(AI);

    return AIConnection;
  },
};

export default genAIController;
