import type { Model } from 'mongoose';
import { Schema, model } from 'mongoose';
import type User from '@/types/user';

interface Settings {
  theme?: 'light' | 'dark';
}

const authProviders = ['password', 'google.com', 'github.com'] as const;

const settingsSchema = new Schema<Settings>({
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
});

const userSchema = new Schema<User>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: authProviders,
      required: true,
    },
    settings: settingsSchema,
  },
  {
    timestamps: true, // This automatically adds `createdAt` and `updatedAt` fields
  },
);

const UserModel: Model<User> = model<User>('User', userSchema);

export default UserModel;
