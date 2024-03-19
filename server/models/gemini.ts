import { Schema, model, Types, InferSchemaType } from "mongoose";

interface Node {
    _id: Types.ObjectId;
    content: String;
    children?:<Node>;
}

const treeNode = new Schema<Node>({
  _id: { type: Types.ObjectId, required: true, unique: true },
  content: { type: String, required: true },
  children: new Schema
});

type TreeNode = InferSchemaType<typeof treeNode>;

module.exports = model<treeNode, TreeNode>("Node", treeNode);
