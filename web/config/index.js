const http = require('http');
const express = require('express');
const cors = require("cors");


const router = express.Router();

const typesRoute = require("./types")

const Schemas = require("../../lib/schema/schemaloader")

const loadConfig = (req, res) => {
      // repo
      //   .listTest()
    //     .then(messages => {
    //       res.setHeader('content-type', 'application/json');
    //       res.header("Access-Control-Allow-Origin", "*");
    //       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //       res.end(JSON.stringify(messages));
    //     })
    //     .catch(e => {
    //       console.error(e);
    //       res.status(500);
    //       res.setHeader('content-type', 'application/json');
    //       res.end(JSON.stringify({ error: e.message }));
    //     });
    // };
}



router.get('/', loadConfig);
//router.get('/types', listTypes);
router.use('/types', typesRoute);
//router.post('/types', express.json(),typesRoute)

module.exports = router;
