import log4js from 'log4js';
import { getEnv } from '@utils/environment';

getEnv();

/**
 * configure log4js and create an instance of logger
 * logging behavior differs with environment
 * see /controllers/userInputController for usage example
 */
const loggerDev = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern:
          '%n %[%d{yyyy-MM-dd hh:mm:ss:SSS} [%p] %c %f{2} %l:%o %F%]%n %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: '',
      enableCallStack: true,
    },
  },
};

const loggerProd = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern:
          '%n %[%d{yyyy-MM-dd hh:mm:ss:SSS} [%p] %c %f{2} %l:%o %F%]%n %m',
      },
    },
    file: {
      type: 'dateFile',
      filename: 'logs/linkta-server.log',
      pattern: 'yyMMddhh',
      keepFileExt: true,
      compress: true,
      layout: {
        type: 'pattern',
        pattern: '%n %d{yyyy-MM-dd hh:mm:ss:SSS} [%p] %c %f{2} %l:%o %F%n %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out', 'file'],
      level: '',
      enableCallStack: true,
    },
  },
};

const { getLogger, configure, isConfigured } = log4js;
const loggerEnv =
  process.env.NODE_ENV === 'production' ? loggerProd : loggerDev;
loggerEnv.categories.default.level = process.env.LOG_LEVEL || 'info';

function configureLogger() {
  configure(loggerEnv);
  const logger = getLogger('[LOGGER SETUP]');
  isConfigured() && logger.info('Log4JS is configured!');
  logger.info(`Logger Environment: ${process.env.LOGGER_ENV}`);
}

export default configureLogger;
