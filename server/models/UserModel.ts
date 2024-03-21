import { Schema, model, Types } from 'mongoose';
import { User } from '../types/datamodels';

const userSchema = new Schema<User>({
  firebaseId: { type: String, required: true, unique: true },
  treeIds: { type: [Types.ObjectId], default: [] },
});

module.exports = model('User', userSchema);
