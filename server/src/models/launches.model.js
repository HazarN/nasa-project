const planets = require('./planets.mongo');
const launches = require('./launches.mongo');
const launcheS = new Map();

let DEFAULT_FLIGHT_NUMBER = 100;

// Example launch object
const launch = {
  // These types of data will be recevied from the client logic
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',

  // These types of data will be received from the server logic
  flightNumber: 100,
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};
saveLaunch(launch);
launcheS.set(launch.flightNumber, launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort('-flightNumber');

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet)
    throw new Error('No matching planet found as a habitable planet');

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const fromServer = {
    flightNumber: newFlightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
  };

  launch = { ...launch, ...fromServer };

  await saveLaunch(launch);
}

async function existLaunchWitId(id) {
  return await launches.findOne({
    flightNumber: id,
  });
}
const getAllLaunches = async () => await launches.find({}, { _id: 0, __v: 0 });

async function abortLaunchById(id) {
  return await launches.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
}

module.exports = {
  getAllLaunches,
  existLaunchWitId,
  scheduleNewLaunch,
  abortLaunchById,
};
