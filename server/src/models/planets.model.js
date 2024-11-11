const fs = require('fs');
const parser = require('csv-parse');
const path = require('path');

const habitablePlanets = new Array();
const filename = path.join(
  __dirname,
  '..',
  '..',
  './data',
  'kepler_dataset.csv'
);

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(
        parser.parse({
          comment: '#',
          delimiter: ',',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data);
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(
          `\nThe "${filename.split('\\').at(-1)}" is parsed succesfully.`
        );

        console.log(`There are ${habitablePlanets.length} habitable planets.`);

        habitablePlanets.map((planet) => planet['kepler_name']);
        resolve();
      });
  });
}

const getAllPlanets = () => habitablePlanets;

module.exports = {
  loadPlanets,
  getAllPlanets,
};
