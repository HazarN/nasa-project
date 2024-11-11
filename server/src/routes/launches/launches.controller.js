const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWitId,
  abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(_, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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

  return res.status(201).json(addNewLaunch(launch));
}

function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);
  const aborted = abortLaunchById(id);

  if (existLaunchWitId(id)) return res.status(200).json(aborted);
  else return res.status(404).json({ error: 'Launch not found, wrong id' });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
