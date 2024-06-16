import UserInput from '@/server/models/UserInputModel';
import type { UserInput as IUserInput } from '@/server/types';
import type { Types } from 'mongoose';
import { createError } from '@/server/middleware/errorHandling';

class UserInputService {
  /**
   * Public method: Creates a new user input and saves it to the database.
   */
  public async createUserInput(
    userId: Types.ObjectId,
    input: string
  ): Promise<IUserInput> {
    try {
      const newUserInput = new UserInput({ userId, input });
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
  }

  public async fetchInputHistory(
    userId: Types.ObjectId,
    page: number,
    limit: number
  ): Promise<IUserInput[]> {
    try {
      const skip = (page - 1) * limit;

      const inputHistory = await UserInput.find({ userId })
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
  }

  public async updateInputTitle(
    userInputId: Types.ObjectId,
    newTitle: string
  ): Promise<IUserInput> {
    try {
      const updatedUserInput = await UserInput.findByIdAndUpdate(
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
  }
}

export default UserInputService;
