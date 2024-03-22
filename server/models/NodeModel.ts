import { Schema, model, Types } from 'mongoose';
import type { TreeNode } from '@/server/types/datamodels';

const treeNode = new Schema<TreeNode>({
  content: { type: String, required: true },
  childNodes: { type: [Types.ObjectId], default: [] },
  depth: { type: Number, required: true, default: 0 },
});

module.exports = model('Node', treeNode);
