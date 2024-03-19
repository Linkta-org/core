import { Schema, model, Types } from "mongoose";

interface User {
  _id: Types.ObjectId;
  userId: string;
  treeIds: [string];
}
const userSchema = new Schema<User>({
  _id: { required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  treeIds: { type: [String], required: true },
});

module.exports = model("User", userSchema);
