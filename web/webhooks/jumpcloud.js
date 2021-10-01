const queue = require('../../lib/queue');
const webhookRoute = (req, res) => {
  console.log(JSON.stringify(req.body));
  const {
    title: title
  } = req.body;
  const message = {
    title: `SolarWinds: ${title}`,
    url: 'prUrl',
  };
  console.log(message);
  queue
    .send('solar', message)
    .then(() => {
      res.end('Received ' + JSON.stringify(message));
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.end(e.message);
    });
};
module.exports = webhookRoute;
