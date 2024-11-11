const launches = new Map();

let latestFlightNumber = 101;

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
launches.set(launch.flightNumber, launch);

const getAllLaunches = () => Array.from(launches.values());
const existLaunchWitId = (id) => launches.has(id);
const addNewLaunch = (launch) => {
  const fromServer = {
    flightNumber: latestFlightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
  };

  launch = { ...launch, ...fromServer };

  launches.set(latestFlightNumber++, launch);
  return launch;
};
const abortLaunchById = (id) => {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
};

module.exports = {
  getAllLaunches,
  existLaunchWitId,
  addNewLaunch,
  abortLaunchById,
};
