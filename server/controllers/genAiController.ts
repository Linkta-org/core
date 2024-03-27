import createAi from '@server/utils/aiFactory';
import { isType } from '@server/utils/typeChecker';
import { createError } from '@server/middleware/errorHandling';
import Prompts from '@server/models/TreePromptsModel';

import type { Request, Response, NextFunction } from 'express';
import { AiInterface, AiTypes, ChainOfThought } from '@server/types';

const genAiController = {
  AI: AiTypes.Gemini,
  defaultPromptMethod: Prompts.costar,

  /**
   * Generate a response from the AI.
   * The response is stored in res.locals.response
   *
   * @param req The request object
   * @param res The response object
   * @param next The next function in the middleware chain
   * @return void
   */
  async generateResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const prompt = req.body.prompt;

    try {
      const aiConnection = genAiController.createConnection(this.AI);

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
   * Generate a tree from the AI.
   * The generated tree is stored in res.locals.tree
   *
   * @param req The request object
   * @param res The response object
   * @param next The next function in the middleware chain
   * @return void
   */
  async generateTree(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userPrompt = req.body.prompt;

    try {
      const response = await this.queryTree(userPrompt);

      // Here we will need to parse the response and build the tree
      // with something more meaningful, like res.locals.tree

      res.locals.tree = response;

      return next();
    } catch (err: unknown) {
      const methodError = createError(
        'generateTree',
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

  /**
   * Query the AI to build a tree
   *
   * @param userPrompt The prompt from the user
   * @param promptMethod (optional) The method to use to generate the prompt
   * @return The response from the AI
   */
  async queryTree(
    userPrompt: string,
    promptMethod?: Function
  ): Promise<string> {
    const AI = this.createConnection(this.AI);

    if (!promptMethod) {
      promptMethod = this.defaultPromptMethod;
    }

    const prompt = promptMethod(userPrompt);

    let response;
    switch (typeof prompt) {
      case 'object':
        const chainOfThought: ChainOfThought = { history: [], prompt: '' };
        if (isType(prompt, chainOfThought)) {
          response = AI.generateConversation(prompt.history, prompt.prompt);
        }
      default:
        response = AI.generateResponse(prompt);
        break;
    }

    return response;
  },
};

export default genAiController;
