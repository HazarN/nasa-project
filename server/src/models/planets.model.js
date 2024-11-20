const fs = require('fs');
const parser = require('csv-parse');
const path = require('path');

const habitablePlanets = new Array();
const planets = require('./planets.mongo');

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
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetsLength = (await getAllPlanets()).length;

        console.log(
          `\nThe "${filename.split('\\').at(-1)}" is parsed succesfully.`
        );

        console.log(`There are ${planetsLength} habitable planets.`);

        resolve();
      });
  });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true, // insert if it's not exists
      }
    );
  } catch (err) {
    console.error(err);
  }
}

const getAllPlanets = async () => await planets.find({}, { _id: 0, __v: 0 });

module.exports = {
  loadPlanets,
  getAllPlanets,
};
