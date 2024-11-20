require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const utils = require('./utils/mongo');
const { loadPlanets } = require('./models/planets.model');

const PORT = process.env.PORT || 8081;

const server = http.createServer(app);

(async function startUp() {
  await utils.connectToMongo();

  await loadPlanets();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
})();
