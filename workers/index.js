const queue = require('../lib/queue');
const repo = require('../lib/repo');

const handleIncoming = message =>
  repo
    .createTest(message)
    //.createSolar(message)
    .then(record => {
      console.log('Saved ' + JSON.stringify(record));
      return queue.send('socket', record);
    });

const handleSolar = message =>
  repo
    .createSolar(message)
    //.createSolar(message)
    .then(record => {
      console.log('Saved ' + JSON.stringify(record));
      return queue.send('socket', record);
    });

queue
  .receive('incoming', handleIncoming)
  .catch(console.error);

queue
  .receive('solar', handleSolar)
  .catch(console.error);
