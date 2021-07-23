const initServer = require('./src/webserver/server');
const connectDb = require('./src/database/connection');
const logger = require('./src/logger');

require('dotenv').config();

async function main() {
  await connectDb();
  initServer();
}

main()
  .catch(error => {
    logger.error(`App error: ${error.stack}`);
    process.exit(1);
  });

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, _promise) => {
  logger.error(`unhandledRejection: ${reason}`);
  process.exit(1);
});
