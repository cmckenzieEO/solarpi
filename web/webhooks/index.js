const express = require('express');
const bodyParser = require('body-parser');
const testRoute = require('./test');
const githubRoute = require('./github');
const solarRoute = require('./solarwinds');
const jumpRoute = require('./jumpcloud');

const isPojo = require("is-pojo");

const queue = require('../../lib/queue');
const MessageTypes = require('../../lib/messageTypes');
const Schemas = require('../../lib/schema/schemaLoader');

const router = express.Router();

const subRoute = async (req, res) => {
    let subUrl = req.params.sub;
    //console.log(subUrl)
    //console.log("json" + JSON.stringify(req.body));
    let message = {}
    //const messageTypes = MessageTypes.MessageTypes;
    const messageTypes = await Schemas.pullFromDB()
    //need to pull from DB
    //question is...pull from db? or from a config file holding db info?

    let typeZ;
    for (type in messageTypes) {
        //console.log(messageTypes[type].subUrl)
        if (messageTypes[type].subUrl == subUrl) {
            console.log("Found:type.sub:sub",messageTypes[type].subUrl,subUrl);
            typeZ = messageTypes[type];
        }
    }
    //console.log(typeZ)
    // for (field in typeZ.messageSchema) {
    //     console.log("Schema: Req: Fields: ",field,req.body[field])
    //     if (req.body[field]) {
    //         message[field] = req.body[field]
    //     } else {
    //         message.misc[field] = req.body[field]
    //     }
    // }
    message.misc = {}
    for (field in req.body) {
        console.log("Req: Schema: Fields: ",field,typeZ.messageSchema[field])
        if (typeZ.messageSchema[field]) {
            message[field] = req.body[field]
        } else {
            message.misc[field] = req.body[field]
        }
    }



    const messagez = req.body;
    queue
        .send(subUrl, message)
            .then(() => {
                res.end('Received ' + JSON.stringify(message));
            })
            .catch(e => {
                console.error(e);
                res.status(500);
                res.end(e.message);
            });
};

//router.post('/test', bodyParser.text({ type: '*/*' }), testRoute);
//router.post('/github', express.json(), githubRoute);
//router.post('/solar', express.json(), solarRoute);
//router.post('/jump', express.json(), jumpRoute);

router.post('/:sub', express.json(), subRoute);

module.exports = router;
