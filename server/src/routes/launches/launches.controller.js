const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWitId,
  abortLaunchById,
} = require('../../models/launches.model');

async function httpGetAllLaunches(_, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    return res.status(400).json({
      error: 'Bad Request! Check the response body',
    });

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === 'Invalid Date')
    return res.status(400).json({
      error: 'Invalid date given to the request body',
    });

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);

  if (await existLaunchWitId(id))
    return res.status(200).json(await abortLaunchById(id));
  else return res.status(404).json({ error: 'Launch not found, wrong id' });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
