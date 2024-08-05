import type { ClientSession } from 'mongoose';
import IdempotencyRecordModel from '@/models/IdempotencyRecordModel';
import type IdempotencyRecord from '@/types/idempotencyRecord';
import { InternalServerError } from '@/utils/customErrors';
import log4js from 'log4js';

const logger = log4js.getLogger('[IdempotencyService]');

/**
 * Creates a service for handling idempotency records
 * @returns {object} Idempotency service with various methods
 */
const createIdempotencyService = () => {
  /**
   * Finds an idempotency record by key.
   */
  const findIdempotencyRecord = async (
    key: string,
    session?: ClientSession,
  ): Promise<IdempotencyRecord | null> => {
    try {
      logger.debug(`Searching for idempotency record with key: ${key}`);

      const record = await IdempotencyRecordModel.findOne({ key }).session(
        session || null,
      );

      if (record) {
        logger.info(`Found idempotency record for key: ${key}`);
      } else {
        logger.info(`No idempotency record found for key: ${key}`);
      }

      return record;
    } catch (error) {
      logger.error('Error finding idempotency record for key', error);

      throw new InternalServerError('Failed to find idempotency record');
    }
  };

  /**
   * Creates a new idempotency record.
   */
  const createIdempotencyRecord = async (
    key: string,
    response: unknown,
    session?: ClientSession,
  ): Promise<IdempotencyRecord> => {
    try {
      logger.debug(`Creating new idempotency record with key: ${key}`);

      const newRecord = new IdempotencyRecordModel({
        key,
        response,
      });

      const savedRecord = await newRecord.save({ session });

      logger.info(`Created new idempotency record for key: ${key}`);

      return savedRecord;
    } catch (error) {
      logger.error(`Error creating idempotency record for key ${key}:`, error);

      throw new InternalServerError('Failed to create idempotency record');
    }
  };

  return {
    findIdempotencyRecord,
    createIdempotencyRecord,
  };
};

export default createIdempotencyService;
