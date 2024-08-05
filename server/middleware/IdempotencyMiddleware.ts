import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import type createIdempotencyService from '@/services/idempotencyService';
import { BadRequestError, InternalServerError } from '@/utils/customErrors';
import { rollbackTransaction } from '@/utils/helpers';
import log4js from 'log4js';

const logger = log4js.getLogger('[IdempotencyMiddleware]');

/**
 * Creates the idempotency middleware.
 * @param {ReturnType<typeof createIdempotencyService>} idempotencyService - The idempotency service instance.
 * @returns {Function} - The middleware function.
 */
const createIdempotencyMiddleware = (
  idempotencyService: ReturnType<typeof createIdempotencyService>,
) => {
  /**
   * Finds an existing idempotency record by key.
   */
  const findExistingRecord = async (
    key: string,
    session: mongoose.ClientSession,
  ) => {
    try {
      return await idempotencyService.findIdempotencyRecord(key, session);
    } catch (error) {
      logger.error('Error finding idempotency record for key', error);
      throw new InternalServerError('Failed to find idempotency record');
    }
  };

  /**
   * Finalizes the idempotency record by storing the response.
   */
  const finalizeIdempotencyRecord = async (
    key: string,
    session: mongoose.ClientSession,
    response: unknown,
  ) => {
    try {
      await idempotencyService.createIdempotencyRecord(key, response, session);
      await session.commitTransaction();
      logger.info(`Stored response for idempotency key: ${key}`);
    } catch (error) {
      await session.abortTransaction();
      logger.error(
        `Failed to store response for idempotency key ${key}:`,
        error,
      );
      throw new InternalServerError(
        'Failed to store response for idempotency record',
      );
    } finally {
      await session.endSession();
    }
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    const idempotencyKey = req.headers['x-request-id'] as string;

    if (!idempotencyKey) {
      logger.warn('Idempotency key is missing in the request');
      return next(new BadRequestError('Idempotency key is required'));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      logger.info(`Processing request with idempotency key: ${idempotencyKey}`);

      // Check if a record with this idempotency key already exists
      const existingRecord = await findExistingRecord(idempotencyKey, session);

      // If a record exists, rollback the transaction and return the existing response
      if (existingRecord) {
        await rollbackTransaction(session);
        logger.info(
          `Returning existing response for idempotency key: ${idempotencyKey}`,
        );
        return res.status(200).json(existingRecord.response);
      }

      // If no existing record, proceed with the request
      logger.debug(
        `Proceeding with request for idempotency key: ${idempotencyKey}`,
      );

      // Prepare a function to save the response after request processing
      // This pre-sets the key and session, so only the response is needed later
      res.locals.finalizeIdempotencyRecord = finalizeIdempotencyRecord.bind(
        null,
        idempotencyKey,
        session,
      );

      next();
    } catch (error) {
      // If any error occurs, rollback the transaction
      await rollbackTransaction(session);
      logger.error(
        `Error in idempotency middleware for key ${idempotencyKey}:`,
        error,
      );
      next(new InternalServerError('Failed to process idempotency request'));
    }
  };
};

export default createIdempotencyMiddleware;
