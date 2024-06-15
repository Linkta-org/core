import { Router } from 'express';
import UserInputController, {
  fetchUserInputList,
} from '@server/controllers/userInputController';
import UserInputService from '@/server/services/userInputService';
import LinktaFlowService from '@/server/services/linktaFlowService';
import AIService from '@/server/services/aiService';

const router = Router();

/**
 * Initializes services and controllers.
 * - AIService: Handles AI response generation.
 * - UserInputService: Manages user input data.
 * - LinktaFlowService: Creates LinktaFlow data.
 * - UserInputController: Controls user input actions.
 */
const aiService = new AIService();
const userInputService = new UserInputService();
const linktaFlowService = new LinktaFlowService(aiService);

const userInputController = new UserInputController(
  userInputService,
  linktaFlowService
);

/**
 * Route to generate a LinktaFlow from user input.
 */
router.post('/', userInputController.generateLinktaFlowFromInput);

// Route for fetching the list of user inputs.
router.get('/', fetchUserInputList);

export default router;
