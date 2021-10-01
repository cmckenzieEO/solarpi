const express = require('express');
const repo = require('../lib/repo');

const MessageTypes = require('../lib/messageTypes');

const listTypes = (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.end(JSON.stringify(messages));
  res.end(JSON.stringify(MessageTypes));
};

const listRoute = (req, res) => {
  repo
    .listTest()
    .then(messages => {
      res.setHeader('content-type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.end(JSON.stringify(messages));
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: e.message }));
    });
};



const listSubRoute = (req, res) => {
  const subs = MessageTypes.MessageTypes;

  for (const type in subs) {
      console.log(subs[type]);
      if (req.params.sub == subs[type].subUrl) {
          console.log("got it");
          repo
            .listSub(req.params.sub)
            .then(messages => {
                res.setHeader('content-type', 'application/json');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.end(JSON.stringify(messages));
            })
            .catch(e => {
                console.error(e);
                res.status(500);
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({ error: e.message }));
            });
    }


    //if (request.params.sub) {
    //need to ask the server for Messagetypes. this way the client receives routes and messages dynamically without changing hardcode
  }
  ////////////////////////////////////////////////////////////
  //repo.listSub(sub)
};

const router = express.Router();
//all messages
router.get('/', listRoute);
router.get('/types', listTypes);
router.get('/:sub', listSubRoute);

//router.get('/solar', solarRoute);

module.exports = router;
