import type { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import type createUserService from '@/services/userService';
import { InternalServerError } from '@/utils/customErrors';

const logger = log4js.getLogger('[User Controller]');

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

      if (linktaUser) {
        res.locals.userProfile = {
          name: linktaUser.name,
          profilePicture: linktaUser.profilePicture,
          authProvider: linktaUser.authProvider,
          settings: linktaUser.settings,
        };
      } else {
        await createUserProfile(_, res, next);
      }

      next();
    } catch (error) {
      logger.error('Error fetching user profile for userId', error);

      next(new InternalServerError('Failed to fetch user profile'));
    }
  };

  /**
   * Fetches a user profile by MongoDB ObjectId.
   */
  // const getUserById = async (
  //   _: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const uid = res.locals.verifiedToken.uid;

  //     logger.debug('Fetching user profile for userId:', uid);

  //     const user = await privateUserService.findUserById(uid);

  //     if (user) {
  //       res.locals.userProfile = {
  //         name: user.name,
  //         profilePicture: user.profilePicture,
  //         settings: user.settings,
  //       };
  //     }

  //     next();
  //   } catch (error) {
  //     logger.error('Error fetching user profile for userId', error);

  //     next(new InternalServerError('Failed to fetch user profile'));
  //   }
  // };

  /**
   * Creates a user profile.
   */
  const createUserProfile = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData = res.locals.user;
      // const userName = req.body.name;
      const { uid, name, profilePicture, authProvider } = userData;

      // logger.debug('Creating or updating user profile for UID:', {
      //   uid,
      //   name,
      //   profilePicture,
      //   authProvider,
      // });

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

  return { fetchUserProfile: getUserByUid, createUserProfile };
};

export default UserController;
