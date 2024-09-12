import UserModel from '@models/UserModel';
import log4js from 'log4js';
import { InternalServerError } from '@/utils/customErrors';

const logger = log4js.getLogger('[UserService]');

/**
 * Creates a service for managing users.
 * @returns {object} User service with various methods
 */
const createUserService = () => {
  /**
   * Finds and returns a user by Firebase UID.
   */
  const findUserByUid = async (uid: string) => {
    try {
      const user = await UserModel.findOne({ uid });

      if (!user) {
        logger.warn('User not found.', 'USER: ', user);
        return null;
      }
      logger.debug('USER found in DB: ', user);

      return user;
    } catch (error) {
      logger.error(`Error finding user by UID: ${uid}`, error);
      throw new InternalServerError('Error finding user by UID.');
    }
  };

  /**
   * Creates a new user.
   */
  const createNewUser = async (userData: {
    uid: string;
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
      });

      await newUser.save();

      logger.debug('New user document created:', newUser);

      return newUser;
    } catch (error) {
      logger.error('Error creating new user', error);

      throw new InternalServerError('Error creating new user.');
    }
  };

  /**
   * updates a user profile
   */
  const updateUser = async (userData: {
    uid: string;
    name?: string;
    profilePicture?: string;
    authProvider: string;
  }) => {
    try {
      logger.debug('Updating user with data:', userData);

      const updatedUser = await UserModel.findOneAndUpdate(
        { uid: userData.uid },
        {
          name: userData.name,
          profilePicture: userData.profilePicture,
        },
        { new: true },
      );

      if (!updatedUser) {
        logger.warn('User not found.');
        return null;
      }

      logger.debug('User updated:', updatedUser);

      return updatedUser;
    } catch (error) {
      logger.error('Error updating user', error);

      throw new InternalServerError('Error updating user.');
    }
  };

  return {
    findUserByUid,
    createNewUser,
    updateUser,
  };
};

export default createUserService;
