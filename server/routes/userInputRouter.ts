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
} from '@/validators/userInputSchemas';
import createIdempotencyService from '@/services/idempotencyService';
import createIdempotencyMiddleware from '@/middleware/IdempotencyMiddleware';

const userInputRouter = Router();

// Instantiate the services
const userInputService = createUserInputService();
const linktaFlowService = createLinktaFlowService();
const aiService = createAIService();
const idempotencyService = createIdempotencyService();

// Instantiate the controller with the services
const userInputController = createUserInputController(
  userInputService,
  linktaFlowService,
  aiService,
);

// Instantiate the middleware with the services
const idempotencyMiddleware = createIdempotencyMiddleware(idempotencyService);

// Apply the authorization middleware to all routes in this router.
userInputRouter.use(isAuthorized());

/**
 * @route POST /v1/inputs
 * @description Generates a LinktaFlow and return a success message
 * @returns {Object} 201 - {message, userInputId}
 */
userInputRouter.post(
  '/',
  validationMiddleware(userInputInputSchema, 'body'),
  idempotencyMiddleware,
  userInputController.generateLinktaFlowFromInput,
  async (_: Request, res: Response) => {
    const responseMessage = `LinktaFlow id ${res.locals.linktaFlowId} created successfully`;

    const response = {
      message: responseMessage,
      userInputId: res.locals.userInputId,
    };

    if (res.locals.finalizeIdempotencyRecord) {
      await res.locals.finalizeIdempotencyRecord(response);
    }

    return res.status(201).json(response);
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
