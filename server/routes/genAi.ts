import express from 'express';
import type { Request, Response } from 'express';
import genAiController from '@/server/controllers/genAiController';

const router = express.Router();

// default route for testing. This route should be removed in production.
router.get('/', (_: Request, res: Response) => {
  res.send({ message: 'Hello from the AI!' });
});

/**
 * Ask a single question of the AI.
 */
router.post(
  '/query',
  genAiController.generateResponse,
  (_: Request, res: Response) => {
    res.send({ message: 'AI response', response: res.locals.response });
  }
);

export default router;
