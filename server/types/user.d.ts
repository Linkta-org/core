import type { Document } from 'mongoose';

interface User extends Document {
  uid: string;
  email?: string;
  name?: string;
  profilePicture?: string;
  authProvider: 'password' | 'google.com' | 'github.com';
  settings?: Settings;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
