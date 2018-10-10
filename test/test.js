const getHistory = require('../src/get-history.js');
const sinon = require('sinon');

it('should get build history', async () => {
  const callback = sinon.fake();

  await getHistory.handler({
    queryStringParameters: {
      repo: 'eugeneware/gifencoder',
    },
  }, {}, callback);

  console.log(...callback.args);
});

it('should disallow unknown repo ', async () => {
  const callback = sinon.fake();

  await getHistory.handler({
    queryStringParameters: {
      repo: 'unknown-578b3196/unknown-3f3db7b048ef',
    },
  }, {}, callback);

  console.log(...callback.args);
});

it('should disallow missing repo argument', async () => {
  const callback = sinon.fake();

  await getHistory.handler({ queryStringParameters: {}, }, {}, callback);

  console.log(...callback.args);
});
