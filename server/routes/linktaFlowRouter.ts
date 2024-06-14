import { Router } from 'express';
import {
  fetchLinktaFlows,
  fetchLinktaFlow,
  updateLinktaFlow,
  deleteLinktaFlow,
} from '@/server/controllers/linktaFlowController';
// TODO: to add validation
const router = Router();

router.get('/', fetchLinktaFlows);

router.get('/:linktaFlowId', fetchLinktaFlow);

router.put('/:linktaFlowId', updateLinktaFlow);

router.delete('/:linktaFlowId', deleteLinktaFlow);

export default router;
