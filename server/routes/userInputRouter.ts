import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
} from '@controllers/userInputController';
import { generateInitialResponse } from '@controllers/genAiController';
import validationMiddleware from '@middleware/validationMiddleware';
import userInputValidationSchema from '@zod/userInputValidation';
const userInputRouter = Router();
// TODO: to add additional validation to headers/params
userInputRouter.post(
  '/',
  validationMiddleware(userInputValidationSchema, 'body'),
  storeUserInputDatabase,
  generateInitialResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'linktaFlow', response: res.locals.linktaFlow });
  }
);

// Route for fetching the list of user inputs.
userInputRouter.get('/', fetchUserInputList);

export default userInputRouter;
