import { Router } from 'express';
import type { Request, Response } from 'express';
import UserController from '@/controllers/userController';
import createUserService from '@/services/userService';
import isAuthorized from '@middleware/firebaseAuthMiddleware';
// import Log4js from 'log4js';

// const logger = Log4js.getLogger('[USER ROUTER]');

const userRouter = Router();

// Instantiate the service
const userService = createUserService();

// Instantiate the controller with the services
const userController = UserController(userService);

// Apply the authorization middleware to all routes in this router.
userRouter.use(isAuthorized());

/**
 * @route GET /v1/users
 * @description Fetches the user profile.
 * @returns {Object} 200 - { userProfile }
 */
userRouter.get(
  '/',
  userController.fetchUserProfile,
  (_: Request, res: Response) => {
    return res.status(200).json({ userProfile: res.locals.userProfile });
  },
);

/**
 * @route POST /v1/users
 * @description Generates a new user profile.
 * @returns {Object} 200 - { newUserProfile }
 */
userRouter.post(
  '/',
  userController.createUserProfile,
  (_: Request, res: Response) => {
    return res.status(201).json({
      newUserProfile: res.locals.newUserProfile,
    });
  },
);

/**
 * @route PUT /v1/users
 * @description Updates the user profile.
 * @returns {Object} 200 - { updatedUserProfile }
 */
userRouter.put(
  '/',
  userController.updateUserProfile,
  (_: Request, res: Response) => {
    return res.status(200).json({
      updatedUserProfile: res.locals.updatedUserProfile,
    });
  },
);

export default userRouter;
