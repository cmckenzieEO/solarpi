const queue = require('../lib/queue');
const repo = require('../lib/repo');

const MessageTypes = require('../lib/messageTypes');
const messageTypes = MessageTypes.MessageTypes;

// const handleIncoming = message =>
//   repo
//     .createSub('test',message)
//     //.createSolar(message)
//     .then(record => {
//       console.log('Saved ' + JSON.stringify(record));
//       return queue.send('socket', record);
//     }).catch(error => {
//         console.log(error)
//     });
//
// const handleSolar = message =>
//   repo
//     .createSub('solar',message)
//     //.createSolar(message)
//     .then(record => {
//       console.log('Saved ' + JSON.stringify(record));
//       return queue.send('socket', record);
//   }).catch(error => {
//       console.log(error);
//   });

const handleSub = message =>
  repo
    .createSub('solar',message)
    //.createSolar(message)
    .then(record => {
      console.log('Saved ' + JSON.stringify(record));
      return queue.send('socket', record);
  }).catch(error => {
      console.log(error);
  });

for (let type in messageTypes) {
    queue
      .receive(messageTypes[type].subUrl, message => {
          repo
            .createSub(messageTypes[type].subUrl,message)
            //.createSolar(message)
            .then(record => {
              console.log('Saved ' + JSON.stringify(record));
              return queue.send('socket', record);
            }).catch(error => {
                console.log(error)
            });
      })
      .catch(console.error);
}

// queue
//   .receive('test', handleIncoming)
//   .catch(console.error);
//
// queue
//   .receive('solar', handleSolar)
//   .catch(console.error);
