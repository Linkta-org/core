import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { createError } from '@/middleware/errorHandling';
import type createUserInputService from '@/services/userInputService';
import type createLinktaFlowService from '@/services/linktaFlowService';
import type createAIService from '@/services/aiService';
import log4js from 'log4js';
import type { CustomNode, CustomEdge } from '@/types';

const logger = log4js.getLogger('[Input Controller]');

/**
 * Creates user input controller with the provided services.
 * @param {ReturnType<typeof createUserInputService>} userInputService - Service to handle user inputs.
 * @param {ReturnType<typeof createLinktaFlowService>} linktaFlowService - Service to handle Linkta flows.
 * @param {ReturnType<typeof createAIService>} aiService - Service to handle AI interactions.
 * @returns {object} User input controller.
 */
const createUserInputController = (
  userInputService: ReturnType<typeof createUserInputService>,
  linktaFlowService: ReturnType<typeof createLinktaFlowService>,
  aiService: ReturnType<typeof createAIService>,
) => {
  // Private services
  const privateUserInputService = userInputService;
  const privateLinktaFlowService = linktaFlowService;
  const privateAIService = aiService;

  /**
   * Generates a Linkta flow from user input.
   */
  const generateLinktaFlowFromInput = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = res.locals.userId;

      const userInput = req.body.input;

      logger.debug('Generating Linkta flow for user:', { userId, userInput });

      // Generate initial response from AI service based on user input
      const aiResponse =
        await privateAIService.generateInitialResponse(userInput);

      logger.info('AI response:', aiResponse);

      const parsedAiResponse = JSON.parse(aiResponse);

      logger.info('Parsed AI response:', parsedAiResponse);

      // Create a new user input document in DB
      const newUserInput = await privateUserInputService.createUserInput(
        userId,
        userInput,
      );

      // Create a new Linkta flow based on AI response
      const newLinktaFlow = await privateLinktaFlowService.createLinktaFlow(
        userId,
        newUserInput._id,
        parsedAiResponse.nodes,
        parsedAiResponse.edges,
      );

      logger.debug('New Linkta flow created:', newLinktaFlow);

      if (newLinktaFlow) {
        const { _id, userInputId, nodes, edges } = newLinktaFlow;

        const mappedNodes = nodes.map((node: CustomNode) => ({
          ...node._doc,
          id: node._id,
          _id: undefined,
        }));

        const mappedEdges = edges.map((edge: CustomEdge) => ({
          ...edge._doc,
          id: edge._id,
          _id: undefined,
        }));

        res.locals.linktaFlow = {
          id: _id,
          userInputId,
          nodes: mappedNodes,
          edges: mappedEdges,
        };
      }

      next();
    } catch (error) {
      logger.error('Error generating Linkta flow from user input', error);

      const methodError = createError(
        'generateLinktaFlowFromInput',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error,
      );
      return next(methodError);
    }
  };

  /**
   * Fetches input history for the user.
   */
  const fetchInputHistory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = res.locals.userId;

      logger.debug('Fetching input history for user:', userId);

      // Parse pagination parameters from the query string with default values
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const inputHistory = await privateUserInputService.fetchInputHistory(
        userId,
        page,
        limit,
      );

      logger.debug('Fetched input history:', inputHistory);

      // Map _id to id
      const inputHistoryWithId = inputHistory.map((input) => ({
        ...input,
        id: input._id,
        _id: undefined,
      }));

      res.locals.inputHistory = inputHistoryWithId;
      next();
    } catch (error) {
      logger.error('Error fetching input history for user', error);

      const methodError = createError(
        'fetchInputHistory',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error,
      );
      return next(methodError);
    }
  };

  /**
   * Updates the title of a user input.
   */
  const updateInputTitle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title } = req.body;
      const { userInputId } = req.params;

      logger.debug('Updating title for userInput:', { userInputId, title });

      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      await privateUserInputService.updateInputTitle(userInputObjectId, title);
      res.locals.message = 'Input Title updated successfully.';
      next();
    } catch (error) {
      logger.error('Error updating user input title', error);
      const methodError = createError(
        'updateInputTitle',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error,
      );
      return next(methodError);
    }
  };

  /**
   * Deletes a user input and associated Linkta flow.
   */
  const deleteUserInput = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userInputId } = req.params;

      logger.debug('Deleting user input:', userInputId);

      const userInputObjectId = new mongoose.Types.ObjectId(userInputId);

      await privateUserInputService.deleteUserInput(userInputObjectId);

      await privateLinktaFlowService.deleteLinktaFlowByUserInputId(
        userInputObjectId,
      );

      res.locals.message = 'Input has been successfully deleted.';
      next();
    } catch (error) {
      logger.error(
        'Error deleting user input and associated Linkta flow',
        error,
      );
      const methodError = createError(
        'deleteUserInput',
        'UserInputController',
        'A problem occurred on our server while processing your request. Our team has been notified, and we are working on a solution. Please try again later.',
        error,
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
