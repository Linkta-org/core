import { Schema, model, Types } from "mongoose";

interface User {
  _id: Types.ObjectId;
  firebaseId: string;
  treeIds: [string];
}
const userSchema = new Schema<User>({
  _id: { required: true, unique: true },
  firebaseId: { type: String, required: true, unique: true },
  treeIds: { type: [String], default: [] },
});

module.exports = model("User", userSchema);
