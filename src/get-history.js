const axios = require('axios');

exports.handler = function(event, context, callback) {
  const repo = event.queryStringParameters.repo;
  if (!repo) {
    callback(new Error('Repo must be specified.'));
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

  return axios.get(
    `https://api.travis-ci.org/repo/${encodeURIComponent(repo)}/builds?branch.name=master&limit=10`, {
      headers: { 'Travis-API-Version': '3', },
    }
  ).then(function(response) {
    const builds = response.data.builds;
    console.log(`builds.length = [${builds.length}]`);
    let history = '';
    for (let iBuild = 0; iBuild < builds.length; ++iBuild) {
      history += `${builds[iBuild].state}, `
    }
    console.log(`history = [${history}]`);
    callback(null, {
      statusCode: 200,
      body: history,
    });
    return;
  }).catch(function(error) {
    callback(error.response.statusText);
  });

}
