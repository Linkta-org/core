import { Request, Response, NextFunction } from 'express';
import LinktaFlow from '@/server/models/LinktaFlowModel';
import { createError } from '@server/middleware/errorHandling';

// Until authentication is implemented, session tokens will be hardcoded in .env
import { getEnv } from '@server/utils/environment';
getEnv();
const USER_ID = process.env.USER_ID;
  
// Fetch a specific LinktaFlow by ID
export const fetchLinktaFlow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!USER_ID) return res.status(401).json({ message: 'You need to log in to access this resource. Please ensure you are logged in and try again.' });
    const linktaFlow = await LinktaFlow.findById(req.params.linktaFlowId).populate('nodes edges');
    if (!linktaFlow) return res.status(404).json({ message: 'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.' });
    return res.status(200).json({ linktaFlow });
  } catch (err: unknown) {
    const error = createError('fetchLinktaFlow', 'linktaFlowController', 'Failed to fetch LinktaFlow', err);
    return next(error);
  }
};

// Delete a specific LinktaFlow
export const deleteLinktaFlow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!USER_ID) return res.status(401).json({ message: 'You need to log in to access this resource. Please ensure you are logged in and try again.' });
    const linktaFlow = await LinktaFlow.findById(req.params.linktaFlowId);
    if (!linktaFlow) return res.status(404).json({ message: 'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.' });
    if (linktaFlow.userId.toString() !== USER_ID) return res.status(403).json({ message: 'You do not have permission to perform this action. If you believe this is an error, please contact support.' });
    await LinktaFlow.findByIdAndDelete(req.params.linktaFlowId);
    return res.status(200).json({ message: `Linkta Flow with ID ${req.params.linktaFlowId} has been successfully deleted.` });
  } catch (err: unknown) {
    const error = createError('deleteLinktaFlow', 'linktaFlowController', 'Failed to delete LinktaFlow', err);
    return next(error);
  }
};