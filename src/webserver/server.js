const http = require('http');
const getApp = require('./app');
const config = require('../config');

module.exports = () => {
  const app = getApp();
  const server = http.createServer(app);

  server.listen(config.port || 3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on port %s', server.address().port);
  });
};
