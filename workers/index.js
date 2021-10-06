const queue = require('../lib/queue');
const repo = require('../lib/repo');

const handleIncoming = message =>
  repo
    .createSub('test',message)
    //.createSolar(message)
    .then(record => {
      console.log('Saved ' + JSON.stringify(record));
      return queue.send('socket', record);
    }).catch(error => {
        console.log(error)
    });

const handleSolar = message =>
  repo
    .createSub('solar',message)
    //.createSolar(message)
    .then(record => {
      console.log('Saved ' + JSON.stringify(record));
      return queue.send('socket', record);
  }).catch(error => {
      console.log(error);
  });

queue
  .receive('incoming', handleIncoming)
  .catch(console.error);

queue
  .receive('solar', handleSolar)
  .catch(console.error);
