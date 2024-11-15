const http = require('http');

const { loadPlanets } = require('./models/planets.model');
const app = require('./app');

const PORT = 10000;

const server = http.createServer(app);

(async function startUp() {
  await loadPlanets();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
})();
