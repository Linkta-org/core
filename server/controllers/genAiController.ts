import createAi from "../utils/aiFactory";
import { createError } from "../middleware/errorHandling";

import type { Request, Response, NextFunction } from "express";
import type { AiInterface, AiTypes } from "../types/ai";

const genAiController = {
  /**
   * Generate a response from the AI
   */
  async generateResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const AI = "gemini";

    const prompt = req.body.prompt;

    try {
      const aiConnection = genAiController.createConnection(AI);

      const response = await aiConnection.generateResponse(prompt);

      res.locals.response = response;

      return next();
    } catch (err: unknown) {
      const methodError = createError(
        "generateResponse",
        "genAiController",
        "Error generating response from AI.",
        err
      );
      return next(methodError);
    }
  },

  /**
   * Create a connection to an AI API
   */
  createConnection(ai: AiTypes): AiInterface {
    const aiConnection = createAi(ai);

    return aiConnection;
  },
};

export default genAiController;
