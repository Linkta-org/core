import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  fetchUserInputList,
  storeUserInputDatabase,
} from '@server/controllers/userInputController';
import { generateInitialResponse } from '@/server/controllers/genAiController';
import validationMiddleware from '@/server/middleware/validationMiddleware';
import userInputValidationSchema from '@/utils/zodSchema/userInputValidation';
const router = Router();
// TODO: to add additional validation to headers/params
router.post(
  '/',
  validationMiddleware(userInputValidationSchema, 'body'),
  storeUserInputDatabase,
  generateInitialResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'linktaFlow', response: res.locals.linktaFlow });
  }
);

// Route for fetching the list of user inputs.
router.get('/', fetchUserInputList);

export default router;
