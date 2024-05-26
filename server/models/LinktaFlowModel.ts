import { Schema, model } from 'mongoose';
import type {
  LinktaFlowType,
  NodeType,
  EdgeType,
} from '@/server/types/datamodels';

// Define the Node schema
const nodeSchema = new Schema<NodeType>({
  id: { type: String, requie: true },
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data: {
    label: { type: String, required: true },
  },
  style: { type: Object },
  className: { type: String },
  hidden: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  draggable: { type: Boolean, default: true },
  dragging: { type: Boolean, default: false },
  selectable: { type: Boolean, default: true },
  connectable: { type: Boolean, default: true },
  deletable: { type: Boolean, default: true },
  dragHandle: { type: String },
  width: { type: Number },
  height: { type: Number },
  parentId: { type: String },
  zIndex: { type: Number },
  extent: { type: String, enum: ['parent', null] },
  expandParent: { type: Boolean },
  sourcePosition: { type: String, enum: ['left', 'right', 'top', 'bottom'] },
  targetPosition: { type: String, enum: ['left', 'right', 'top', 'bottom'] },
  ariaLabel: { type: String },
  focusable: { type: Boolean, default: true },
  resizing: { type: Boolean, default: false },
});

// Define the Edge schema
const edgeSchema = new Schema<EdgeType>({
  id: { type: String, requie: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { type: String },
  sourceHandle: { type: String },
  targetHandle: { type: String },
  style: { type: Object },
  animated: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
  deletable: { type: Boolean, default: true },
  className: { type: String },
  selected: { type: Boolean, default: false },
  zIndex: { type: Number },
  ariaLabel: { type: String },
  focusable: { type: Boolean, default: true },
  label: { type: String },
  labelStyle: { type: Object },
  labelShowBg: { type: Boolean, default: true },
  labelBgStyle: { type: Object },
  labelBgPadding: { type: [Number] },
  labelBgBorderRadius: { type: Number },
  pathOptions: {
    offset: { type: Number },
    borderRadius: { type: Number },
    curvature: { type: Number },
  },
});

// Define the LinktaFlow schema
const linktaFlowSchema = new Schema<LinktaFlowType>({
  nodes: { type: [nodeSchema], required: true },
  edges: { type: [edgeSchema], required: true },
  userInputId: {
    type: Schema.Types.ObjectId,
    ref: 'UserInput',
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model<LinktaFlowType>('LinktaFlow', linktaFlowSchema);
