import express, { Express, Request, Response } from 'express';
import { getEnv } from './utils/base';

getEnv();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', (_: Request, res: Response) => {
  res.send({ message: 'Hello from the Backend!' });
});

app.use()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});