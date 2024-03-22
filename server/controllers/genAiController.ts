import createAi from '@/server/utils/aiFactory';
import { createError } from '@/server/middleware/errorHandling';

import type { Request, Response, NextFunction } from 'express';
import type { AiInterface, AiTypes } from '@/server/types/ai';

const genAiController = {
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
    const AI = 'gemini';

    const prompt = req.body.prompt;

    try {
      const aiConnection = genAiController.createConnection(AI);

      const response = await aiConnection.generateResponse(prompt);

      res.locals.response = response;

      return next();
    } catch (err: unknown) {
      const methodError = createError(
        'generateResponse',
        'genAiController',
        'Error generating response from AI.',
        err
      );
      return next(methodError);
    }
  },

  /**
   * Create a connection to an AI API
   *
   * @param ai The type of AI to connect to
   */
  createConnection(ai: AiTypes): AiInterface {
    const aiConnection = createAi(ai);

    return aiConnection;
  },
};

export default genAiController;
