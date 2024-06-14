import type { Request, Response, NextFunction } from 'express';
import UserInput from '@models/UserInputModel';
// import { getLogger } from 'log4js';
import { MOCK_USER_ID } from '@/mocks';

// const logger = getLogger('[Input Controller]');

// Middleware to store user input in the database
export const storeUserInputDatabase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInput = req.body.input;

    if (!userInput || typeof userInput !== 'string') {
      return res.status(400).json({ error: 'Invalid user input' });
    }

    // Retrieve the user ID from the request headers or use a mock ID in non-production environments
    const userId =
      process.env.NODE_ENV === 'production'
        ? req.headers['x-user-id'] || req.headers['x-user-id']
        : MOCK_USER_ID;

    if (!userId) {
      // logger.warn('Unauthorized access attempt without a user ID.');
      res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
      return;
    }

    // Store the user input in the database
    const newUserInput = new UserInput({ userId: userId, input: userInput });
    await newUserInput.save();

    return next();
  } catch (error) {
    // logger.error('Error storing user input:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to fetch the list of user inputs for a given user ID.
export const fetchUserInputList = async (req: Request, res: Response) => {
  try {
    // Retrieve the user ID from the request headers or use a mock ID in non-production environments
    const userId =
      process.env.NODE_ENV === 'development'
        ? req.headers['x-user-id'] || MOCK_USER_ID
        : req.headers['x-user-id'];

    if (!userId) {
      // logger.warn('Unauthorized access attempt without a user ID.');
      res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
      return;
    }

    // Parse pagination parameters from the query string with default values
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    // Fetch user inputs from the database with pagination and sorting (desc order)
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
    // logger.error('Error fetching user inputs:', error);
    res.status(500).json({
      message:
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
    });
  }
};
