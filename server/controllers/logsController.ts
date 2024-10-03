import type { Request, Response, NextFunction } from 'express';
import type createLogsService from './services/logsService';
import { BadRequestError, InternalServerError } from '@/utils/customErrors';
import { readdir, readFileSync, unlinkSync } from 'fs';
import { Readable } from 'stream';
import { promisify } from 'util';
import { Binary } from 'mongodb';
import archiver from 'archiver';
import log4js from 'log4js';

export interface LogFile {
  filename: string;
  fileData: Buffer;
}

const logger = log4js.getLogger('[LOGS CONTROLLER]');
const readdirAsync = promisify(readdir);

const createLogsController = (
  logsService: ReturnType<typeof createLogsService>,
) => {
  const privateLogsService = logsService;
  const retentionCutoffDate = () => {
    // 10 days ago
    return new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    // 2 seconds ago for testing purposes:
    // return new Date(Date.now() - 2 * 1000);
  };

  // upload the cold log files from the local /logs directory to the database
  const uploadLogs = async () => {
    try {
      // Read the logs directory
      const files = await readdirAsync('./logs');

      logger.debug('Uploading log files:', files);

      // Process each log file
      const logsUpdate: LogFile[] = files.map((filename) => {
        const filePath = `./logs/${filename}`;
        const fileData = readFileSync(filePath);
        return { filename, fileData };
      });

      // Upload the logs to the database
      await logsService.uploadLogs(logsUpdate);
    } catch (error) {
      logger.error('Error processing logs:', error);
    }
  };

  const evictLogs = async () => {
    // delete aged logs from the local directory
    try {
      // Read the logs directory
      const files = await readdirAsync('./logs');

      logger.debug('Evicting log files:', files);

      for (const filename of files) {
        // skip the hot log file
        if (filename === 'linkta-server.log') continue;
        const filePath = `./logs/${filename}`;
        // for Date created from yyMMdd pattern:
        const fileCreatedAt = new Date(filename.split('.')[1]);
        // next three lines for Date created from yyMMddhhmm pattern for testing purposes:
        // const fileDateString = filename.split('.')[1]; // get date/time section from filename
        // const dateString = `20${fileDateString.substring(0, 2)}-${fileDateString.substring(2, 4)}-${fileDateString.substring(4, 6)} ${fileDateString.substring(6, 8)}:${fileDateString.substring(8, 10)}:00`; // build a valid date/time string YYYY-MM-DD HH:MM:SS
        // const fileCreatedAt = new Date(dateString); // create the date object for comparison
        if (fileCreatedAt < retentionCutoffDate()) {
          // delete the file
          unlinkSync(filePath);
        }
      }
    } catch (err) {
      logger.error('Error reading log directory:', err);
    }

    // delete aged logs from the database
    await logsService.evictLogs(retentionCutoffDate());
  };

  const getLogsByDateRange = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.debug('Fetching logs by date range');

    try {
      const { startDate: startDateString, endDate: endDateString } = req.body;

      const startDate = startDateString
        ? new Date(startDateString)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

      const endDate = endDateString ? new Date(endDateString) : new Date(); // Current date

      // Validate dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new BadRequestError('Invalid startDate or endDate provided.');
      }

      logger.debug('Fetching logs by date range:', startDate, endDate);

      // Fetch logs from the logs service
      const logs = await privateLogsService.getLogsByDateRange(
        startDate,
        endDate,
      );

      // Set the response headers
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=logs.zip');

      // Create a zip archive
      const archive = archiver('zip', { zlib: { level: 9 } });

      // Pipe the archive to the response
      archive.pipe(res);

      // Add each log file to the zip archive
      for (const log of logs) {
        const { filename, fileData } = log;

        if (fileData instanceof Binary) {
          const fileBuffer = fileData.buffer; // Extract the binary buffer from MongoDB Binary

          // Convert the file buffer to a readable stream
          const fileStream = new Readable();
          fileStream._read = () => {}; // No-op _read function
          fileStream.push(fileBuffer);
          fileStream.push(null); // Signal end of stream

          // Append the file stream to the zip archive
          archive.append(fileStream, { name: filename });
        } else {
          logger.error(
            `Unexpected file data type for ${filename}. Expected MongoDB Binary.`,
          );
        }
      }

      // Finalize the archive (it will be sent in the response)
      await archive.finalize();
    } catch (error) {
      logger.error('Error fetching logs by date range:', error);
      next(new InternalServerError('Failed to fetch logs by date range'));
    }
  };

  return { uploadLogs, evictLogs, getLogsByDateRange };
};

export default createLogsController;
