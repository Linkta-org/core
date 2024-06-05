import { Router } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
  submitUserInput,
} from '@server/controllers/userInputController';

const router = Router();

router.post('/', storeUserInputDatabase, submitUserInput);

// Route for fetching the list of user inputs.
router.get('/', fetchUserInputList);

export default router;
