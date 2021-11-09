const http = require('http');
const express = require('express');
const cors = require("cors");


const router = express.Router();

const Schemas = require("../../lib/schema/schemaloader")

const listTypes = async (req, res) => {
    const types = await Schemas.pullFromDB()
    //console.log("hi",types)
    res.setHeader('content-type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.end(JSON.stringify(messages));
    //res.end(JSON.stringify(MessageTypes));
    let bob = JSON.stringify(types)
    console.log(bob)
    res.end(JSON.stringify(types));
};

const postType = async (req, res) => {
    let number = req.query.multiple
    console.log('post type')
    let saver;
    //this method will need to save to DB, then load from DB
    if (number) {
        saver = await Schemas.saveToDB(true,req.body)
    } else {
        saver = await Schemas.saveToDB(false,req.body)
     }
    // saver.then(save => {
    //     console.log(save)
        //if save is good
        console.log(saver)
        if (saver) {
            res.setHeader('content-type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            Schemas.loadFromDB().then(types => res.end(JSON.stringify(types)))
            // res.end(JSON.stringify(types));
        }

}


router.get('/', listTypes);
router.get('/list', listTypes);
//router.get('/list', typesRoute);
router.post('/', express.json(),postType);

module.exports = router;
