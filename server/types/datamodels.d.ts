export type User = {
  _id: Types.ObjectId;
  firebaseId: string;
  treeIds: [string];
};

export type TreeNode = {
  _id: Types.ObjectId;
  content: string;
  childNodes: [string];
  depth: number;
};
