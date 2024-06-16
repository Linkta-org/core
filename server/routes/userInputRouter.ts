import { Router } from 'express';
import type { Request, Response } from 'express';
import UserInputController from '@server/controllers/userInputController';
import UserInputService from '@/server/services/userInputService';
import LinktaFlowService from '@/server/services/linktaFlowService';
import AIService from '@/server/services/aiService';
import validationMiddleware from '@/server/middleware/validationMiddleware';
import {
  userInputIdSchema,
  userInputInputSchema,
  userInputTitleSchema,
} from '@/server/zod/UserInputSchemas';

const router = Router();

/**
 * Initializes services and controllers.
 * - AIService: Handles AI response generation.
 * - UserInputService: Manages user input data.
 * - LinktaFlowService: Creates LinktaFlow data.
 * - UserInputController: Controls user input actions.
 */
const aiService = new AIService();
const userInputService = new UserInputService();
const linktaFlowService = new LinktaFlowService(aiService);

const userInputController = new UserInputController(
  userInputService,
  linktaFlowService
);

/**
 * @route POST /v1/inputs
 * @description Generates a LinktaFlow and fetches updated input history.
 * @returns {Object} 200 - { linktaFlow, inputHistory }
 */
router.post(
  '/',
  validationMiddleware(userInputInputSchema, 'body'),
  userInputController.generateLinktaFlowFromInput,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      linktaFlow: res.locals.linktaFlow,
      inputHistory: res.locals.inputHistory,
    });
  }
);

/**
 * @route GET /v1/inputs
 * @description Fetches the list of user inputs.
 * @returns {Array} 200 - inputHistory
 */
router.get(
  '/',
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json(res.locals.inputHistory);
  }
);

/**
 * @route PUT /v1/inputs/:userInputId
 * @description Updates the title of a specific user input and fetches the updated input history.
 * @returns {Object} 200 - { message, inputHistory }
 */
router.put(
  '/:userInputId',
  validationMiddleware(userInputIdSchema, 'params'),
  validationMiddleware(userInputTitleSchema, 'body'),
  userInputController.updateInputTitle,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
      inputHistory: res.locals.inputHistory,
    });
  }
);

export default router;
