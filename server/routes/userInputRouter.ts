import { Router } from 'express';
import type { Request, Response } from 'express';
import createUserInputController from '@/controllers/userInputController';
import createUserInputService from '@/services/userInputService';
import createLinktaFlowService from '@/services/linktaFlowService';
import createAIService from '@/services/aiService';
import validationMiddleware from '@/middleware/validationMiddleware';
import {
  userInputIdSchema,
  userInputInputSchema,
  userInputTitleSchema,
} from '@/zod/userInputSchemas';

const router = Router();

// Instantiate the services
const userInputService = createUserInputService();
const linktaFlowService = createLinktaFlowService();
const aiService = createAIService();

// Instantiate the controller with the services
const userInputController = createUserInputController(
  userInputService,
  linktaFlowService,
  aiService
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
    return res.status(200).json({ inputHistory: res.locals.inputHistory });
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

/**
@route DELETE /v1/inputs/:userInputId
@description Deletes a specific user input and fetches the updated input history.
@returns {Object} 200 - { message, inputHistory }
*/
router.delete(
  '/:userInputId',
  validationMiddleware(userInputIdSchema, 'params'),
  userInputController.deleteUserInput,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
      inputHistory: res.locals.inputHistory,
    });
  }
);

export default router;
