const axios = require('axios');

exports.history = async (req, res) => {
  const repo = req.query.repo;
  if (!repo) {
    res.status(422);
    res.send('repo must be specified');
    return;
  }

  // https://api.travis-ci.org/repo/${encodeURIComponent(repo)}/builds?branch.name=master&limit=10
  // Header: Travis-API-Version: 3
  //
  // {
  //     "@type": "builds",
  //     "@href": "/repo/anishkny%2Frealworld-dynamodb-lambda/builds?branch.name=master&limit=10",
  //     "@representation": "standard",
  //     "builds": [
  //       {
  //         "state": "passed",
  //         ...
  //       },
  //     ],
  //     ...
  //   }

  let response = null;

  try {
    response = (await axios.get(
      `https://api.travis-ci.org/repo/${encodeURIComponent(repo)}/builds?branch.name=master&limit=10`, {
        headers: {
          'Travis-API-Version': '3',
        },
      }));
  } catch (e) {
    res.status(e.response.status);
    res.send(e.response.statusText);
    return;
  }
  const builds = response.data.builds;

  let history = '';
  for (let iBuild = 0; iBuild < builds.length; ++iBuild) {
    history += `${builds[iBuild].state}, `
  }
  res.status(200);
  res.send(history);
  return;
}
