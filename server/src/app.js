const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morgan('short'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
