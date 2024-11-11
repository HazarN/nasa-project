const API_URL = 'http://localhost:5000';

async function httpGetPlanets() {
  try {
    const res = await fetch(`${API_URL}/planets`);
    console.log(await res.json());

    /* return await res.json(); */
  } catch {
    throw new Error('Failed to fetch the data');
  }
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  try {
    const res = await fetch(`${API_URL}/launches`);
    console.log(await res.json());
    /* return await res.json().sort((x, y) => x.flightNumber - y.flightNumber); */
  } catch {
    throw new Error('Failed to fetch the data');
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
