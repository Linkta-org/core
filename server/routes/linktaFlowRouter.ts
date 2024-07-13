import { Router } from 'express';
import type { Request, Response } from 'express';
import createLinktaFlowController from '@/controllers/linktaFlowController';
import createLinktaFlowService from '@/services/linktaFlowService';
import isAuthorized from '@middleware/firebaseAuthMiddleware';
import createUserService from '@/services/userService';

const linktaFlowRouter = Router();

// Instantiate the services
const linktaFlowService = createLinktaFlowService();
const userService = createUserService();

// Instantiate the controller with the services
const linktaFlowController = createLinktaFlowController(linktaFlowService);

// Apply the authorization middleware to all routes in this router.
linktaFlowRouter.use(isAuthorized(userService));

/**
 * @route GET /v1/flows/:userInputId
 * @description Fetch a specific LinktaFlow by userInputId.
 * @returns {Object} 200 - linktaFlow
 */
linktaFlowRouter.get(
  '/:userInputId',
  linktaFlowController.fetchLinktaFlow,
  (_: Request, res: Response) => {
    return res.status(200).json({ linktaFlow: res.locals.linktaFlow });
  },
);

/**
 * @route PUT /v1/flows/:linktaFlowId
 * @description Update a specific LinktaFlow.
 * @returns {Object} 200 - message
 */
linktaFlowRouter.put(
  '/:linktaFlowId',
  linktaFlowController.updateLinktaFlow,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
    });
  },
);

export default linktaFlowRouter;
