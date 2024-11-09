const express = require('express');

const { getAllPlanets } = require('./planet.controller');

const planetRouter = express.Router();

planetRouter.get('/api/planets', getAllPlanets);

module.exports = planetRouter;
