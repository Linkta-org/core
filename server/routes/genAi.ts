import express, {Request, Response} from 'express';
import genAiController from '../controllers/genAiController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello from the AI!' });
});

router.post('/ask', (req: Request, res: Response) => {
  res.send({ message: 'AI response' });
});