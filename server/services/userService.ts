import UserModel from '@models/UserModel';
import { createError } from '@middleware/errorHandling';
import log4js from 'log4js';
import type { Types } from 'mongoose';

const logger = log4js.getLogger('[UserService]');

/**
 * Creates a service for managing users.
 * @returns {object} User service with various methods
 */
const createUserService = () => {
  /**
   * Finds a user by UID.
   */
  const findUserByUid = async (uid: string) => {
    try {
      logger.debug('Finding user with UID:', uid);

      const user = await UserModel.findOne({ uid });

      if (!user) {
        logger.warn('User not found.');
        return null;
      }

      return user;
    } catch (error) {
      logger.error('Error finding user by UID', error);
      const methodError = createError(
        'findUserByUid',
        'UserService',
        'Error finding user by UID.',
        error,
      );
      throw methodError;
    }
  };

  /**
   * Finds a user by ID.
   */
  const findUserById = async (userId: Types.ObjectId) => {
    try {
      logger.debug('Finding user with userId:', userId);

      const user = await UserModel.findById(userId);

      if (!user) {
        logger.warn('User not found.');
        return null;
      }

      return user;
    } catch (error) {
      logger.error('Error finding user by ID', error);
      const methodError = createError(
        'findUserById',
        'UserService',
        'Error finding user by ID.',
        error,
      );
      throw methodError;
    }
  };

  /**
   * Creates a new user.
   */
  const createNewUser = async (userData: {
    uid: string;
    email?: string;
    name?: string;
    profilePicture?: string;
    authProvider: string;
  }) => {
    try {
      logger.debug('Creating new user with data:', userData);

      const newUser = new UserModel({
        ...userData,
        settings: {
          theme: 'light',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newUser.save();

      logger.debug('New user document created:', newUser);

      return newUser;
    } catch (error) {
      logger.error('Error creating new user', error);
      const methodError = createError(
        'createNewUser',
        'UserService',
        'Error creating new user.',
        error,
      );
      throw methodError;
    }
  };

  return {
    findUserByUid,
    findUserById,
    createNewUser,
  };
};

export default createUserService;
