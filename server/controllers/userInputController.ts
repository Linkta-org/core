import type { Request, Response, NextFunction } from 'express';
import UserInput from '@server/models/UserInputModel';
import genAiController from './genAiController';
import { getLogger } from 'log4js';
import { MOCK_USER_ID } from '@/mocks';

const logger = getLogger('[Input Controller]');

// Middleware to store user input in the database
export const storeUserInputDatabase = async (req: Request, res: Response) => {
  try {
    const { userInput } = req.body;

    if (!userInput || typeof userInput !== 'string') {
      return res.status(400).json({ error: 'Invalid user input' });
    }

    // Store the user input in the database
    const newUserInput = new UserInput({ input: userInput });
    await newUserInput.save();

    // Send a response back
    res
      .status(201)
      .json({ message: 'User input stored successfully', data: newUserInput });
  } catch (error) {
    logger.error('Error storing user input:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to submit user input to another controller
export const submitUserInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userInput } = req.body;

    if (!userInput || typeof userInput !== 'string') {
      return res.status(400).json({ error: 'Invalid user input' });
    }

    // Forward the user input to genAiController's generateResponse method
    req.body.prompt = userInput; // setting the prompt in request body
    await genAiController.generateResponse(req, res, next);
  } catch (error) {
    logger.error('Error submitting user input:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to fetch the list of user inputs for a given user ID.
export const fetchUserInputList = async (req: Request, res: Response) => {
  try {
    const userId =
      process.env.NODE_ENV !== 'production'
        ? req.headers['x-user-id'] || req.headers['x-user-id']
        : MOCK_USER_ID;

    if (!userId) {
      logger.warn('Unauthorized access attempt without a user ID.');
      res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
      return;
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const skip = (page - 1) * limit;

    const userInputs = await UserInput.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .select('input');

    if (!userInputs.length) {
      return res.status(200).json({ userInputs: [] });
    }

    return res.status(200).json({ userInputs });
  } catch (error) {
    logger.error('Error fetching user inputs:', error);
    res.status(500).json({
      message:
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
    });
  }
};
