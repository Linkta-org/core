import type { Request, Response } from 'express';
import UserInput from '@server/models/UserInputModel';
import { getLogger } from 'log4js';
import { MOCK_USER_ID } from '@/mocks';
import mongoose from 'mongoose';
import { sanitizeUserInput } from '@/utils/sanitizeUserInput';
import type IUserInputService from '@/server/services/userInputService';
import type ILinktaFlowService from '@/server/services/linktaFlowService';

const logger = getLogger('[Input Controller]');

class UserInputController {
  private userInputService: IUserInputService;
  private linktaFlowService: ILinktaFlowService;

  /**
   * Initializes the UserInputController with the necessary services.
   * @param {IUserInputService} userInputService - Service to handle user input operations.
   * @param {ILinktaFlowService} linktaFlowService - Service to handle LinktaFlow operations.
   */
  constructor(
    userInputService: IUserInputService,
    linktaFlowService: ILinktaFlowService
  ) {
    this.userInputService = userInputService;
    this.linktaFlowService = linktaFlowService;
  }

  /**
   * Public method: Generates a LinktaFlow from user input.
   */
  public generateLinktaFlowFromInput = async (req: Request, res: Response) => {
    try {
      const userInput = req.body.input;
      //TODO: replace with validation middleware
      if (!userInput || typeof userInput !== 'string') {
        return res.status(400).json({ error: 'Invalid user input' });
      }

      // TODO: replace with auth middleware
      let userId =
        process.env.NODE_ENV === 'development'
          ? MOCK_USER_ID
          : req.headers['x-user-id'];

      if (Array.isArray(userId)) {
        userId = userId[0];
      }
      //TODO: replace with validation middleware
      if (!userId) {
        logger.warn('Unauthorized access attempt without a user ID.');
        return res.status(401).json({
          message:
            'You need to log in to access this resource. Please ensure you are logged in and try again.',
        });
      }
      // convert userId string to object id
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const sanitizedInput = sanitizeUserInput(userInput);

      const newUserInput = await this.userInputService.createUserInput(
        userObjectId,
        sanitizedInput
      );

      const newLinktaFlow =
        await this.linktaFlowService.createLinktaFlowFromInput(
          userObjectId,
          newUserInput._id,
          sanitizedInput
        );

      return res.status(200).json({
        id: newLinktaFlow._id,
        userInputId: newUserInput._id,
        linktaFlowData: newLinktaFlow,
      });
    } catch (error) {
      logger.error('Error storing user input:', error);
      res.status(500).json({
        message:
          'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
      });
    }
  };
}

// Middleware to fetch the list of user inputs for a given user ID.
export const fetchUserInputList = async (req: Request, res: Response) => {
  try {
    // Retrieve the user ID from the request headers or use a mock ID in non-production environments
    const userId =
      process.env.NODE_ENV === 'development'
        ? req.headers['x-user-id'] || MOCK_USER_ID
        : req.headers['x-user-id'];

    if (!userId) {
      logger.warn('Unauthorized access attempt without a user ID.');
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
      .select('title input');

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

export default UserInputController;
