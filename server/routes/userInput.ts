import { Router } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
  submitUserInput,
} from '@server/controllers/userInputController';

const router = Router();

router.post('/', storeUserInputDatabase, submitUserInput);

router.get('/', fetchUserInputList);

export default router;
