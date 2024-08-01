import { Router } from 'express';
import type { Request, Response } from 'express';
import createUserController from '@/controllers/userController';
import createUserService from '@/services/userService';
import isAuthorized from '@middleware/firebaseAuthMiddleware';

const userRouter = Router();

// Instantiate the services
const userService = createUserService();

// Instantiate the controller with the services
const userController = createUserController(userService);

// Apply the authorization middleware to all routes in this router.
userRouter.use(isAuthorized());

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

export default userRouter;
