import type { Request, Response } from 'express';
import { Router } from 'express';
import createUserInputController from '@/controllers/userInputController';
import validationMiddleware from '@/middleware/validationMiddleware';
import createLinktaFlowService from '@/services/linktaFlowService';
import createUserInputService from '@/services/userInputService';
import isAuthorized from '@middleware/firebaseAuthMiddleware';
import createAIService from '@/services/aiService';
import {
  userInputIdSchema,
  userInputInputSchema,
  userInputTitleSchema,
} from '@/zod/userInputSchemas';

const userInputRouter = Router();

// Instantiate the services
const userInputService = createUserInputService();
const linktaFlowService = createLinktaFlowService();
const aiService = createAIService();

// Instantiate the controller with the services
const userInputController = createUserInputController(
  userInputService,
  linktaFlowService,
  aiService,
);

/**
 * @route POST /v1/inputs
 * @description Generates a LinktaFlow and fetches updated input history.
 * @returns {Object} 200 - { linktaFlow, inputHistory }
 */
userInputRouter.post(
  '/',
  isAuthorized,
  validationMiddleware(userInputInputSchema, 'body'),
  userInputController.generateLinktaFlowFromInput,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      linktaFlow: res.locals.linktaFlow,
      inputHistory: res.locals.inputHistory,
    });
  },
);

/**
 * @route GET /v1/inputs
 * @description Fetches the list of user inputs.
 * @returns {Array} 200 - inputHistory
 * This is a second test for the lint-staged config
 */
userInputRouter.get(
  '/',
  isAuthorized,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({ inputHistory: res.locals.inputHistory });
  },
);

/**
 * @route PUT /v1/inputs/:userInputId
 * @description Updates the title of a specific user input and fetches the updated input history.
 * @returns {Object} 200 - { message, inputHistory }
 */
userInputRouter.put(
  '/:userInputId',
  isAuthorized,
  validationMiddleware(userInputIdSchema, 'params'),
  validationMiddleware(userInputTitleSchema, 'body'),
  userInputController.updateInputTitle,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
      inputHistory: res.locals.inputHistory,
    });
  },
);

/**
@route DELETE /v1/inputs/:userInputId
@description Deletes a specific user input and fetches the updated input history.
@returns {Object} 200 - { message, inputHistory }
*/
userInputRouter.delete(
  '/:userInputId',
  isAuthorized,
  validationMiddleware(userInputIdSchema, 'params'),
  userInputController.deleteUserInput,
  userInputController.fetchInputHistory,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
      inputHistory: res.locals.inputHistory,
    });
  },
);

export default userInputRouter;
