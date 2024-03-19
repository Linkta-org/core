import { Schema, model, Types} from "mongoose";

interface Node {
  _id: Types.ObjectId;
  content: string;
  childNodes: [string];
  level: number;
}

const treeNode = new Schema<Node>({
  _id: { required: true, unique: true },
  content: { type: String, required: true },
  childNodes: { type: [String], default: [] },
  level: { type: Number, required: true, default: 0 },
});

module.exports = model("Node", treeNode);
