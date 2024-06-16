import type { NextFunction, Request, Response } from 'express';
import { MOCK_USER_ID } from '@/server/mocks';
import mongoose from 'mongoose';
import { sanitizeUserInput } from '@/server/zod/UserInputSchemas';
import type IUserInputService from '@/server/services/userInputService';
import type ILinktaFlowService from '@/server/services/linktaFlowService';
import { createError } from '@/server/middleware/errorHandling';

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
  public generateLinktaFlowFromInput = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userInput = req.body.input;

      // TODO: replace with auth middleware
      let userId =
        process.env.NODE_ENV === 'development'
          ? MOCK_USER_ID
          : req.headers['x-user-id'];

      if (Array.isArray(userId)) {
        userId = userId[0];
      }

      if (!userId) {
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

      const { _id, userInputId, nodes, edges } = newLinktaFlow;

      res.locals.linktaFlow = {
        _id,
        userInputId,
        nodes,
        edges,
      };

      next();
    } catch (error) {
      const methodError = createError(
        'generateLinktaFlowFromInput',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error
      );
      return next(methodError);
    }
  };
  /**
   * Public method: Fetches the input history for a given user ID.
   */
  public fetchInputHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //TODO: replace with validation middleware
      let userId =
        process.env.NODE_ENV === 'development'
          ? req.headers['x-user-id'] || MOCK_USER_ID
          : req.headers['x-user-id'];

      if (Array.isArray(userId)) {
        userId = userId[0];
      }
      //TODO: replace with validation middleware
      if (!userId) {
        res.status(401).json({
          message:
            'You need to log in to access this resource. Please ensure you are logged in and try again.',
        });
        return;
      }

      // Parse pagination parameters from the query string with default values
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const userObjectId = new mongoose.Types.ObjectId(userId);

      // Fetch user inputs from the database with pagination and sorting (desc order)
      const inputHistory = await this.userInputService.fetchInputHistory(
        userObjectId,
        page,
        limit
      );

      res.locals.inputHistory = inputHistory;
      next();
    } catch (error) {
      const methodError = createError(
        'fetchInputHistory',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error
      );
      return next(methodError);
    }
  };

  public updateInputTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title } = req.body;
      const { userInputId } = req.params;

      // TODO: Replace with auth middleware
      let userId =
        process.env.NODE_ENV === 'development'
          ? req.headers['x-user-id'] || MOCK_USER_ID
          : req.headers['x-user-id'];

      if (Array.isArray(userId)) {
        userId = userId[0];
      }

      if (!userId) {
        res.status(401).json({
          message:
            'You need to log in to access this resource. Please ensure you are logged in and try again.',
        });
        return;
      }

      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      await this.userInputService.updateInputTitle(userInputObjectId, title);
      res.locals.message = 'Input Title updated successfully.';
      next();
    } catch (error) {
      const methodError = createError(
        'updateInputTitle',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error
      );
      return next(methodError);
    }
  };

  public deleteUserInput = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userInputId } = req.params;

      //TODO: replace with auth middleware
      let userId =
        process.env.NODE_ENV === 'development'
          ? req.headers['x-user-id'] || MOCK_USER_ID
          : req.headers['x-user-id'];

      if (Array.isArray(userId)) {
        userId = userId[0];
      }

      if (!userId) {
        res.status(401).json({
          message:
            'You need to log in to access this resource. Please ensure you are logged in and try again.',
        });
        return;
      }

      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      await this.userInputService.deleteUserInput(userInputObjectId);

      await this.linktaFlowService.deleteLinktaFlowByUserInputId(
        userInputObjectId
      );

      res.locals.message = 'Input has been successfully deleted.';
      next();
    } catch (error) {
      const methodError = createError(
        'deleteUserInput',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error
      );
      return next(methodError);
    }
  };
}

export default UserInputController;
