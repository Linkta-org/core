import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import type createUserService from '@/services/userService';
import { InternalServerError } from '@/utils/customErrors';

const logger = log4js.getLogger('[USER CONTROLLER]');

/**
 * Creates user controller with the provided services.
 * @returns {object} User controller.
 */
const UserController = (userService: ReturnType<typeof createUserService>) => {
  const privateUserService = userService;

  /**
   * Fetches a user profile by Firebase UID.
   */
  const getUserByUid = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // logger.debug('RES.LOCALS: ', res.locals);
      const uid = res.locals.user.uid;

      logger.debug('Fetching user profile for userId:', uid);

      const linktaUser = await privateUserService.findUserByUid(uid);
      logger.debug('LINKTA USER: ', linktaUser);

      res.locals.userProfile = linktaUser;
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
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { uid, name, profilePicture, authProvider } = res.locals.user;

      const newUser = await privateUserService.createNewUser({
        uid,
        name: name,
        profilePicture: profilePicture,
        authProvider,
      });

      res.locals.userProfile = {
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

  /**
   * updates a user profile
   */
  const updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { uid, profilePicture, authProvider } = res.locals.user;
      const name = req.body.name || res.locals.user.name;

      const newUser = await privateUserService.updateUser({
        uid,
        name: name,
        profilePicture: profilePicture,
        authProvider,
      });

      if (newUser) {
        res.locals.userProfile = {
          name: newUser.name,
          profilePicture: newUser.profilePicture,
          settings: newUser.settings,
        };
      }

      next();
    } catch (error) {
      logger.error('Error creating or updating user profile', error);

      next(new InternalServerError('Failed to create or update user profile'));
    }
  };

  return {
    fetchUserProfile: getUserByUid,
    createUserProfile,
    updateUserProfile,
  };
};

export default UserController;
