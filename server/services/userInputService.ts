import UserInput from '@/server/models/UserInputModel';
import type { UserInput as IUserInput } from '@/server/types';
import type { Types } from 'mongoose';

class UserInputService {
  /**
   * Public method: Creates a new user input and saves it to the database.
   */
  public async createUserInput(
    userId: Types.ObjectId,
    input: string
  ): Promise<IUserInput> {
    const newUserInput = new UserInput({ userId, input });
    await newUserInput.save();
    return newUserInput;
  }
}

export default UserInputService;
