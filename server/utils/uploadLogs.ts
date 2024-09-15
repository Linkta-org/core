import cron from 'node-cron';
import { readdir, createReadStream } from 'fs';
import log4js from 'log4js';
import type { Db } from 'mongodb';
import { GridFSBucket, MongoClient } from 'mongodb';

const logger = log4js.getLogger('[UPLOAD LOGS]');
const logsUri = process.env.LOGGER_DB_URI;

const uploadFile = async (db: Db, filePath: string, fileName: string) => {
  const bucket = new GridFSBucket(db);
  const uploadStream = bucket.openUploadStream(fileName);
  const fileStream = createReadStream(filePath);

  fileStream
    .pipe(uploadStream)
    .on('error', (error) => {
      console.log('Error uploading file:', error);
    })
    .on('finish', () => {
      console.log(`${fileName} uploaded successfully`);
    });
};

const uploadLogs = cron.schedule('0 0 * * *', async () => {
  if (!logsUri) {
    throw new Error('Missing DB connection string!');
  }
  const loggerDbClient = new MongoClient(logsUri);

  try {
    await loggerDbClient.connect().then((client: MongoClient) => {
      const db = client.db('log_backup');
      readdir('./logs', (err, files) => {
        if (err) {
          logger.error('Error reading log directory:', err);
          return;
        }
        logger.debug('Uploading log files:', files);

        files.forEach(async (file) => {
          const path = `./logs/${file}`;
          await uploadFile(db, path, file).then(() => {
            logger.info(`${file} uploaded successfully`);
          });
        });
      });

      loggerDbClient
        .close()
        .then(() => {
          logger.info('Logger connection closed');
        })
        .catch((err) => {
          logger.error('Error closing Logger connection:', err);
        });
    });
  } catch (error) {
    logger.error('Error connecting to Logger DB:', error);
  }
});

export default uploadLogs;
