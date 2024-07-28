import { Schema, model } from 'mongoose';
import type { LinktaFlow } from '@/types/linktaFlow';

// Define the Node schema
const nodeSchema = new Schema({
  id: { type: String, required: true },
  data: {
    label: { type: String, required: true },
  },
});

// Define the Edge schema
const edgeSchema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
});

// Define the LinkTaFlow schema
const linktaFlowSchema = new Schema<LinktaFlow>(
  {
    nodes: { type: [nodeSchema], required: true },
    edges: { type: [edgeSchema], required: true },
    userInputId: {
      type: Schema.Types.ObjectId,
      ref: 'UserInput',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export default model<LinktaFlow>('LinkTaFlow', linktaFlowSchema);
