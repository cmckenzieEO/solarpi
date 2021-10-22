const express = require('express');
const repo = require('../../lib/repo');
const router = express.Router();

//router.get('/', express.json(), githubRoute);

const MessageTypes = require('../../lib/messageTypes');

const countRoute = (req,res) => {
    repo.listCount()
         .then(messages => {
          res.setHeader('content-type', 'application/json');
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          let count = Object.keys(messages).length
          console.log("count: " + count)
          res.end(JSON.stringify(count));
          //res.end(JSON.stringify(messages));
      })
      .catch(e => {
        console.error(e);
        res.status(500);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ error: e.message }));
      });
};

const countSubRoute = (req, res) => {
  const subs = MessageTypes.MessageTypes;
  for (const type in subs) {
      if (req.params.sub == subs[type].subUrl) {
          console.log("got it");
          repo
            .listSubCount(req.params.sub)
            .then(count => {
                res.setHeader('content-type', 'application/json');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                //let count = Object.keys(messages).length
                res.end(JSON.stringify(count));
                //res.end(JSON.stringify(messages));
                //res.end(JSON.stringify(count));
            })
            .catch(e => {
                console.error(e);
                res.status(500);
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify({ error: e.message }));
            });
    }
  }
};

router.get('/', countRoute);
router.get('/:sub', countSubRoute);

module.exports = router;
