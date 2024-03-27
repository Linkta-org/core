import createAI from '@server/utils/AIFactory';
import { createError } from '@/server/middleware/errorHandling';
import TreePrompts from '@/server/models/TreePromptsModel';
import { isType } from '@server/utils/typeChecker';
import { AIProvider } from '@server/types/index';

import type { Request, Response, NextFunction } from 'express';
import type { GenerativeAIModel, ChainOfThought } from '@server/types/index';

class GenAIController {
  AI: AIProvider;
  defaultPromptMethod: Function;

  constructor() {
    this.AI = AIProvider.Gemini;
    this.defaultPromptMethod = TreePrompts.costar;

    this.generateResponse = this.generateResponse.bind(this);
    this.generateTree = this.generateTree.bind(this);
    this.createConnection = this.createConnection.bind(this);
    this.queryTree = this.queryTree.bind(this);
  }

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
      const AIConnection = this.createConnection(this.AI);

      const response = await AIConnection.generateResponse(prompt);

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
  }

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
  }

  /**
   * Create a connection to an AI API
   *
   * @param AI The type of AI to connect to
   */
  createConnection(AI: AIProvider): GenerativeAIModel {
    const AIConnection = createAI(AI);

    return AIConnection;
  }

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

    if (typeof prompt === 'object') {
      const chainOfThought: ChainOfThought = { history: [], prompt: '' };
      if (isType(prompt, chainOfThought)) {
        return AI.generateConversation(prompt.history, prompt.prompt);
      }
    }

    return AI.generateResponse(prompt);
  }
}

const genAIController = new GenAIController();
export default genAIController;
