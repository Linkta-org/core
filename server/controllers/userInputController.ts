import type { NextFunction, Request, Response } from 'express';
import { MOCK_USER_ID } from '@/server/mocks';
import mongoose from 'mongoose';
import { sanitizeUserInput } from '@/server/zod/UserInputSchemas';
import { createError } from '@/server/middleware/errorHandling';
import type createUserInputService from '@/server/services/userInputService';
import type createLinktaFlowService from '@/server/services/linktaFlowService';

const createUserInputController = (
  userInputService: ReturnType<typeof createUserInputService>,
  linktaFlowService: ReturnType<typeof createLinktaFlowService>
) => {
  // Private services
  const _userInputService = userInputService;
  const _linktaFlowService = linktaFlowService;

  const generateLinktaFlowFromInput = async (
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

      const newUserInput = await _userInputService.createUserInput(
        userObjectId,
        sanitizedInput
      );

      const newLinktaFlow = await _linktaFlowService.createLinktaFlowFromInput(
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

  const fetchInputHistory = async (
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
      const inputHistory = await _userInputService.fetchInputHistory(
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

  const updateInputTitle = async (
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

      await _userInputService.updateInputTitle(userInputObjectId, title);
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

  const deleteUserInput = async (
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

      await _userInputService.deleteUserInput(userInputObjectId);

      await _linktaFlowService.deleteLinktaFlowByUserInputId(userInputObjectId);

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

  return {
    generateLinktaFlowFromInput,
    fetchInputHistory,
    updateInputTitle,
    deleteUserInput,
  };
};

export default createUserInputController;
