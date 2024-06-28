import { Router } from 'express';
import {
  fetchLinktaFlows,
  fetchLinktaFlow,
  updateLinktaFlow,
  deleteLinktaFlow,
} from '@controllers/linktaFlowController';
import isAuthorized from '@middleware/firebaseAuthMiddleware';

const linktaFlowRouter = Router();

linktaFlowRouter.get('/', isAuthorized, fetchLinktaFlows);

linktaFlowRouter.get('/:linktaFlowId', isAuthorized, fetchLinktaFlow);

linktaFlowRouter.put('/:linktaFlowId', isAuthorized, updateLinktaFlow);

linktaFlowRouter.delete('/:linktaFlowId', isAuthorized, deleteLinktaFlow);

export default linktaFlowRouter;
