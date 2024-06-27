import { Router } from 'express';
import isAuthorized from '@middleware/firebaseAuthMiddleware';

const authRouter = Router();

authRouter.get('/', isAuthorized);

authRouter.post('/', isAuthorized);

// authRouter.put('/:linktaFlowId', updateLinktaFlow);

// authRouter.delete('/:linktaFlowId', deleteLinktaFlow);

export default authRouter;
