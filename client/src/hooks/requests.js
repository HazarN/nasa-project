const API_URL = 'http://localhost:5000';

async function httpGetPlanets() {
  try {
    const res = await fetch(`${API_URL}/planets`);
    return await res.json();
  } catch {
    throw new Error('Failed to fetch the data');
  }
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.

  try {
    const res = await fetch(`${API_URL}/launches`);
    const data = await res.json();

    return data.sort((x, y) => x.flightNumber - y.flightNumber);
  } catch {
    throw new Error('Failed to fetch the data');
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.

  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
