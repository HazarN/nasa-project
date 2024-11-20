const mongoose = require('mongoose');

mongoose.connection.once('open', () => console.log('\nConnected to MongoDB'));
mongoose.connection.on('error', (err) => console.error(err));

async function connectToMongo() {
  await mongoose.connect(
    `mongodb+srv://HazarN:${process.env.DB_PASSWORD}@nasacluster.vqjjh.mongodb.net/`
  );
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connectToMongo,
  disconnect,
};
