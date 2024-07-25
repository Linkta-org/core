import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import type createUserService from '@/services/userService';
import { InternalServerError } from '@/utils/customErrors';

const logger = log4js.getLogger('[User Controller]');

/**
 * Creates user controller with the provided services.
 * @returns {object} User controller.
 */
const createUserController = (
  userService: ReturnType<typeof createUserService>,
) => {
  const privateUserService = userService;

  /**
   * Fetches a user profile by user ID.
   */
  const fetchUserProfile = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = res.locals.userId;

      logger.debug('Fetching user profile for userId:', userId);

      const user = await privateUserService.findUserById(userId);

      if (user) {
        res.locals.userProfile = {
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          settings: user.settings,
        };
      }

      next();
    } catch (error) {
      logger.error('Error fetching user profile for userId', error);

      next(new InternalServerError('Failed to fetch user profile'));
    }
  };

  /**
   * Creates a user profile.
   */
  const createUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData = res.locals.userData;

      const userName = req.body.name;

      const { uid, email, name, profilePicture, authProvider } = userData;

      logger.debug('Creating or updating user profile for UID:', uid);

      const newUser = await privateUserService.createNewUser({
        uid,
        email,
        name: userName || name,
        profilePicture,
        authProvider,
      });

      res.locals.newUserProfile = {
        email: newUser.email,
        name: newUser.name,
        profilePicture: newUser.profilePicture,
        settings: newUser.settings,
      };

      next();
    } catch (error) {
      logger.error('Error creating or updating user profile', error);

      next(new InternalServerError('Failed to create or update user profile'));
    }
  };

  return { fetchUserProfile, createUserProfile };
};

export default createUserController;
