import UserInputModel from '@/models/UserInputModel';
import type { UserInput } from '@/types';
import type { Types } from 'mongoose';
import { createError } from '@/middleware/errorHandling';

/**
 * Creates a service for managing user inputs.
 * @returns {object} User input service with various methods
 */
const createUserInputService = () => {
  /**
   * Creates a new user input.
   */
  const createUserInput = async (
    userId: Types.ObjectId,
    input: string,
    title?: string
  ): Promise<UserInput> => {
    try {
      // Set the title to the input value if not provided
      const finalTitle = title || input;

      // Creates a new user input in DB
      const newUserInput = new UserInputModel({
        userId,
        input,
        title: finalTitle,
      });
      await newUserInput.save();
      return newUserInput;
    } catch (error) {
      const methodError = createError(
        'createUserInput',
        'UserInputService',
        'Error creating user input.',
        error
      );
      throw methodError;
    }
  };

  /**
   * Fetches input history for a user.
   */
  const fetchInputHistory = async (
    userId: Types.ObjectId,
    page: number,
    limit: number
  ): Promise<UserInput[]> => {
    try {
      // Calculate the number of items to skip for pagination
      const skip = (page - 1) * limit;

      // Fetch the input history from DB
      const inputHistory = await UserInputModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .select('title input');

      return inputHistory;
    } catch (error) {
      const methodError = createError(
        'fetchInputHistory',
        'UserInputService',
        'Error fetching input history.',
        error
      );
      throw methodError;
    }
  };

  /**
   * Updates the title of a user input.
   */
  const updateInputTitle = async (
    userInputId: Types.ObjectId,
    newTitle: string
  ): Promise<UserInput> => {
    try {
      // Update the title of the specified user input in DB
      const updatedUserInput = await UserInputModel.findByIdAndUpdate(
        userInputId,
        { title: newTitle },
        { new: true }
      );

      if (!updatedUserInput) {
        throw new Error(`UserInput with id ${userInputId} not found.`);
      }

      return updatedUserInput;
    } catch (error) {
      const methodError = createError(
        'updateInputTitle',
        'UserInputService',
        'Error updating input title.',
        error
      );
      throw methodError;
    }
  };

  /**
   * Deletes a user input.
   */
  const deleteUserInput = async (
    userInputId: Types.ObjectId
  ): Promise<UserInput | null> => {
    try {
      // Delete the user input document in DB
      const deletedUserInput =
        await UserInputModel.findByIdAndDelete(userInputId);

      return deletedUserInput;
    } catch (error) {
      const methodError = createError(
        'deleteInputAndAssociatedData',
        'UserInputService',
        'Error deleting input and associated data.',
        error
      );
      throw methodError;
    }
  };

  return {
    createUserInput,
    fetchInputHistory,
    updateInputTitle,
    deleteUserInput,
  };
};

export default createUserInputService;
