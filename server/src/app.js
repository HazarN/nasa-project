const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const planetRouter = require('./routes/planet/planet.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morgan('short'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetRouter);

module.exports = app;
