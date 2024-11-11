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
  try {
    const res = await fetch(`${API_URL}/launches`);
    const data = await res.json();

    return data.sort((x, y) => x.flightNumber - y.flightNumber);
  } catch {
    throw new Error('Failed to fetch the data');
  }
}

async function httpSubmitLaunch(launch) {
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
  try {
    return await fetch(`${API_URL}/launches/${id}`, { method: 'DELETE' });
  } catch {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
