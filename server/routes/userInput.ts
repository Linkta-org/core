import { Router } from 'express';
import {
  storeUserInputDatabase,
  submitUserInput,
} from '@server/controllers/userInputController';

const router = Router();

router.post('/v1/inputs', storeUserInputDatabase, submitUserInput);

export default router;
