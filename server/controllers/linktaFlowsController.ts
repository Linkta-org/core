import { Request, Response } from 'express';


export const getTreesByUserId = (req: Request, res: Response) => {
  console.log('HIT')
  res.send('get user trees for userID: ' + req.params.userId);
}

export const deleteTreeByTreeId = (req: Request, res: Response) => {
  console.log('HIT')
 res.send('delete tree with treeID: ' + req.params.treeId);
}

export const updateTreeByTreeId = (req: Request, res: Response) => {
  console.log('HIT')
 res.send('update tree with treeID: ' + req.body.treeId);
}

export const getTreeByTreeId = (req: Request, res: Response) => {
  console.log('HIT')
 res.send('get tree with treeID: ' + req.body.treeId);
}
