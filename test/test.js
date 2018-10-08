const sut = require('../index.js');
const sinon = require('sinon');

it('should get build history', async () => {
  const res = createMockResponseHandler();
  await sut.history({ query: { repo: 'eugeneware/gifencoder' } }, res);
  console.log(res.status.args[0]);
  console.log(res.send.args[0]);
});

it('should return 404 for unknown repo', async () => {
  const res = createMockResponseHandler();
  await sut.history({ query: { repo: 'anishkny/unknown-f3d86dbcd73a' } }, res);
  console.log(res.status.args[0]);
  console.log(res.send.args[0]);
});

function createMockResponseHandler() {
  return {
    status: sinon.fake(),
    send: sinon.fake(),
  };
}
