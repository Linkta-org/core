import { Router } from 'express';
import {
  storeUserInputDatabase,
  submitUserInput,
} from '@server/controllers/userInputController';

const router = Router();

router.post('/', storeUserInputDatabase, submitUserInput);

export default router;
