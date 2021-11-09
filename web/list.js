const express = require('express');
const repo = require('../lib/repo');
const router = express.Router();

const countRouter = require('./count');

const MessageTypes = require('../lib/messageTypes');
const Schemas = require("../lib/schema/schemaLoader")

const listTypes = async (req, res) => {
    const types = await Schemas.pullFromDB()
    console.log("hi",types)
    res.setHeader('content-type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.end(JSON.stringify(messages));
    //res.end(JSON.stringify(MessageTypes));
    let bob = JSON.stringify(types)
    console.log(bob)
    res.end(JSON.stringify(types));
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

const listHeaders = {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
}

const listSubRoute = async (req, res) => {
    const subs = await Schemas.pullFromDB()
    //console.log("hi",subs)
  //const subs = MessageTypes.MessageTypes;
  for (const type in subs) {
      if (req.params.sub == subs[type].subUrl) {
          repo
            .listSub(req.params.sub)
            .then(messages => {
                res.set(listHeaders);
                res.end(JSON.stringify(messages));
            })
            .catch(e => {
                console.error(e);
                res.status(500);
                //res.setHeader('ontent-type', 'application/json');
                res.setType('application/json');
                res.end(JSON.stringify({ error: e.message }));
            });
    }
}
};




//all messages
router.get('/', listRoute);
router.use('/count', countRouter);
router.get('/types', listTypes);
router.get('/:sub', listSubRoute);

//router.get('/solar', solarRoute);

module.exports = router;
