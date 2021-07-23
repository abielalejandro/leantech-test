const config = {
  port: process.env.PORT || 3000,
  uri: process.env.URI || "mongodb://mongo:27017/stock",
};

module.exports = config;
