import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  storeUserInputDatabase,
  submitUserInput,
} from '@server/controllers/userInputController';
import { generateInitialResponse } from '@/server/controllers/genAiController';

const router = Router();

router.post(
  '/',
  storeUserInputDatabase,
  submitUserInput,
  generateInitialResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'linktaFlow', response: res.locals.linktaFlow });
});

export default router;
