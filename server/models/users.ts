import  mongoose  from "mongoose";

interface User {
  userId: string;
  treeIds: string[];
}

const userSchema = new mongoose.Schema<User>({
  userId: { type: String, required: true, unique: true },
  treeIds: { type: [String], required: true },
});

module.exports = model("User", userSchema);
