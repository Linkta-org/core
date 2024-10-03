import { InternalServerError } from '@/utils/customErrors';
import { MongoClient, Binary } from 'mongodb';
import { getEnv } from '@utils/environment';
import log4js from 'log4js';
import { type LogFile } from '@controllers/logsController';

getEnv();
const logger = log4js.getLogger('[LOGS SERVICE]');
const logsUri = process.env.LOGGER_DB_URI as string;
const logsClient = new MongoClient(logsUri);

/**
 * Creates a service for managing users.
 * @returns {object} Logs service with various methods
 */
const createLogsService = () => {
  /**
   * Uploads all log files from the local /logs directory to the database.
   */
  const uploadLogs = async (logs: LogFile[]) => {
    try {
      await logsClient
        .connect()
        .then(() => logger.info('Connected to logs database'))
        .catch((err) => logger.error('Error connecting to logs database', err));
      const db = logsClient.db('log_backup');
      const logsCollection = db.collection('logs');

      const bulkOperations = logs.map((log) => ({
        updateOne: {
          filter: { filename: log.filename },
          update: {
            $set: {
              filename: log.filename,
              fileData: new Binary(log.fileData),
              createdAt: new Date(),
            },
          },
          upsert: true,
        },
      }));

      // Perform bulk update
      await logsCollection.bulkWrite(bulkOperations);

      logger.info(
        'Uploaded logs:',
        logs.map((log) => log.filename),
      );
    } catch (error) {
      logger.error('Error uploading logs', error);
      throw new InternalServerError('Error uploading logs.');
    } finally {
      await logsClient.close();
      logger.info('Closed logs database connection');
    }
  };

  /**
   * Deletes all logs created before a given date.
   */
  const evictLogs = async (cutoffDate: Date) => {
    try {
      await logsClient
        .connect()
        .then(() => logger.info('Connected to logs database'))
        .catch((err) => logger.error('Error connecting to logs database', err));
      const db = logsClient.db('log_backup');
      const logsCollection = db.collection('logs');

      const evictedLogs = await logsCollection.deleteMany({
        createdAt: { $lt: cutoffDate },
      });

      logger.info('Deleted logs:', evictedLogs);
    } catch (error) {
      logger.error('Error deleting logs', error);
      throw new InternalServerError('Error deleting logs.');
    } finally {
      await logsClient.close();
      logger.info('Closed logs database connection');
    }
  };

  /**
   * Gets all log files from within a given date range.
   */
  const getLogsByDateRange = async (startDate: Date, endDate: Date) => {
    try {
      await logsClient
        .connect()
        .then(() => logger.info('Connected to logs database'))
        .catch((err) => logger.error('Error connecting to logs database', err));
      const db = logsClient.db('log_backup');
      const logsCollection = db.collection('logs');

      const logs = await logsCollection
        .find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
        .toArray();

      return logs;
    } catch (error) {
      logger.error('Error finding logs by date range', error);
      throw new InternalServerError('Error finding logs by date range.');
    } finally {
      await logsClient.close();
      logger.info('Closed logs database connection');
    }
  };

  return { uploadLogs, evictLogs, getLogsByDateRange };
};

export default createLogsService;
