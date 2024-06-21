import { Router } from 'express';
import type { Request, Response } from 'express';
import createLinktaFlowController from '@/controllers/linktaFlowController';
import createLinktaFlowService from '@/services/linktaFlowService';

const router = Router();

// Instantiate the services
const linktaFlowService = createLinktaFlowService();

// Instantiate the controller with the services
const linktaFlowController = createLinktaFlowController(linktaFlowService);

/**
 * @route GET /v1/flows/:userInputId
 * @description Fetch a specific LinktaFlow by userInputId.
 * @returns {Object} 200 - linktaFlow
 */
router.get(
  '/:userInputId',
  linktaFlowController.fetchLinktaFlow,
  (_: Request, res: Response) => {
    return res.status(200).json({ linktaFlow: res.locals.linktaFlow });
  }
);

/**
 * @route PUT /v1/flows/:linktaFlowId
 * @description Update a specific LinktaFlow.
 * @returns {Object} 200 - message
 */
router.put(
  '/:linktaFlowId',
  linktaFlowController.updateLinktaFlow,
  (_: Request, res: Response) => {
    return res.status(200).json({
      message: res.locals.message,
    });
  }
);

export default router;
