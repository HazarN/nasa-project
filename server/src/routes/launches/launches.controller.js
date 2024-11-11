const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

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

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
