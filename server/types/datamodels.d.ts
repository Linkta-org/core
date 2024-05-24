import type { Types } from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  userInputs: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserInput = {
  _id: Types.ObjectId;
  input: string;
  linktaFlows: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type LinktaFlow = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  nodes: Node[];
  edges: Edge[];
  userInputId: Types.ObjectId;
};

export type Node = {
  _id: Types.ObjectId;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
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
};

export type Edge = {
  _id: Types.ObjectId;
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
};

export type TreeNode = {
  _id: Types.ObjectId;
  content: string;
  childNodes: [{ type: Types.ObjectId; ref: TreeNode }];
  depth: number;
};
