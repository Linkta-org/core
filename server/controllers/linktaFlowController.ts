import type { Request, Response, NextFunction } from 'express';
import LinktaFlow from '@models/LinktaFlowModel';
import { createError } from '@middleware/errorHandling';

// Until authentication is implemented, user id will be stored in a single variable
import { MOCK_USER_ID } from '@/mocks';

// Fetch all LinktaFlows associated with the authenticated user
export const fetchLinktaFlows = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!MOCK_USER_ID)
      return res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
    const linktaFlows = await LinktaFlow.find({ userId: MOCK_USER_ID });
    return res.status(200).json({ linktaFlows });
  } catch (err: unknown) {
    const error = createError(
      'fetchLinktaFlows',
      'linktaFlowController',
      'Failed to fetch LinktaFlows',
      err,
    );
    return next(error);
  }
};

// Fetch a specific LinktaFlow by ID
export const fetchLinktaFlow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!MOCK_USER_ID)
      return res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
    const linktaFlow = await LinktaFlow.findById(
      req.params.linktaFlowId,
    ).populate('nodes edges');
    if (!linktaFlow)
      return res.status(404).json({
        message:
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.',
      });
    return res.status(200).json({ linktaFlow });
  } catch (err: unknown) {
    const error = createError(
      'fetchLinktaFlow',
      'linktaFlowController',
      'Failed to fetch LinktaFlow',
      err,
    );
    return next(error);
  }
};

// Update a specific LinktaFlow
export const updateLinktaFlow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!MOCK_USER_ID)
      return res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
    const updatedLinktaFlow = await LinktaFlow.findByIdAndUpdate(
      req.params.linktaFlowId,
      req.body.updatedLinktaFlow,
      { new: true },
    );
    if (!updatedLinktaFlow)
      return res.status(404).json({
        message:
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.',
      });
    return res.status(200).json({
      message: `Linkta Flow updated successfully on ${new Date().toISOString()}.`,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'ValidationError')
      return res.status(400).json({
        message:
          'Your request could not be processed as it contains invalid data. Please check your input and try again.',
      });
    const error = createError(
      'updateLinktaFlow',
      'linktaFlowController',
      'Failed to update LinktaFlow',
      err,
    );
    return next(error);
  }
};

// Delete a specific LinktaFlow
export const deleteLinktaFlow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!MOCK_USER_ID)
      return res.status(401).json({
        message:
          'You need to log in to access this resource. Please ensure you are logged in and try again.',
      });
    const linktaFlow = await LinktaFlow.findById(req.params.linktaFlowId);
    if (!linktaFlow)
      return res.status(404).json({
        message:
          'The requested Linkta Flow could not be found. It may have been deleted or the ID might be incorrect.',
      });
    if (linktaFlow.userId.toString() !== MOCK_USER_ID)
      return res.status(403).json({
        message:
          'You do not have permission to perform this action. If you believe this is an error, please contact support.',
      });
    await LinktaFlow.findByIdAndDelete(req.params.linktaFlowId);
    return res.status(200).json({
      message: `Linkta Flow with ID ${req.params.linktaFlowId} has been successfully deleted.`,
    });
  } catch (err: unknown) {
    const error = createError(
      'deleteLinktaFlow',
      'linktaFlowController',
      'Failed to delete LinktaFlow',
      err,
    );
    return next(error);
  }
};
