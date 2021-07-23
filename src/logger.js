const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

// Avoid log to 'propagate' to higher level
const levelFilter = (level) => {
  return winston.format((info, _opts) => {
    if (info.level !== level) {
      return false;
    }
    return info;
  })();
};

const transports = [
  new winston.transports.DailyRotateFile({
    filename: path.join('logs', 'info', 'log-%DATE%.log'),
    datePattern: 'DD-MM-YYYY',
    format: levelFilter('info'),
  }),

  new winston.transports.DailyRotateFile({
    filename: path.join('logs', 'errors', 'error-%DATE%.log'),
    datePattern: 'DD-MM-YYYY',
    level: 'error',
    format: levelFilter('error'),
  }),

  new winston.transports.Console(),
];

const LoggerInstance = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports,
  exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
});

module.exports = LoggerInstance;
