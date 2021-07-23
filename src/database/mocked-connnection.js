const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports.connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, connectionOptions);
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
};

module.exports.clearDatabase = () => {
  const { collections } = mongoose.connection;
  Object.keys(collections).forEach((collectionName) => {
    const collection = collections[collectionName];
    collection.deleteMany();
  });
};
