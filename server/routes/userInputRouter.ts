import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
} from '@controllers/userInputController';
import { generateInitialResponse } from '@controllers/genAiController';

const userInputRouter = Router();

userInputRouter.post(
  '/',
  storeUserInputDatabase,
  generateInitialResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'linktaFlow', response: res.locals.linktaFlow });
  }
);

// Route for fetching the list of user inputs.
userInputRouter.get('/', fetchUserInputList);

export default userInputRouter;
