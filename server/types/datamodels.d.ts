import type { Types } from 'mongoose';

export type UserInput = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  input: string;
  linktaFlowId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomNode = {
  _id: string;
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
  style?: object;
  className?: string;
  hidden?: boolean;
  selected?: boolean;
  draggable?: boolean;
  dragging?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number;
  height?: number;
  parentId?: string;
  zIndex?: number;
  extent?: 'parent' | null;
  expandParent?: boolean;
  sourcePosition?: 'left' | 'right' | 'top' | 'bottom';
  targetPosition?: 'left' | 'right' | 'top' | 'bottom';
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;
  _doc?: CustomNode;
};

export type CustomEdge = {
  _id: string;
  id: string;
  source: string;
  target: string;
  type?: string;
  sourceHandle?: string;
  targetHandle?: string;
  style?: object;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  className?: string;
  selected?: boolean;
  zIndex?: number;
  ariaLabel?: string;
  focusable?: boolean;
  label?: string;
  labelStyle?: object;
  labelShowBg?: boolean;
  labelBgStyle?: object;
  labelBgPadding?: number[];
  labelBgBorderRadius?: number;
  pathOptions?: {
    offset?: number;
    borderRadius?: number;
    curvature?: number;
  };
  _doc?: CustomEdge;
};

export type LinktaFlow = {
  _id: Types.ObjectId;
  id: string;
  userId: Types.ObjectId;
  nodes: CustomNode[];
  edges: CustomEdge[];
  userInputId: Types.ObjectId;
};
