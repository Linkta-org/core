import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
} from '@server/controllers/userInputController';
import { generateInitialResponse } from '@/server/controllers/genAiController';

const router = Router();

router.post(
  '/',
  storeUserInputDatabase,
  generateInitialResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'linktaFlow', response: res.locals.linktaFlow });
  }
);

// Route for fetching the list of user inputs.
router.get('/', fetchUserInputList);

export default router;
