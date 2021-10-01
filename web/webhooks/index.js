const express = require('express');
const bodyParser = require('body-parser');
const testRoute = require('./test');
const githubRoute = require('./github');
const solarRoute = require('./solarwinds');
const jumpRoute = require('./jumpcloud');

const router = express.Router();

router.post('/test', bodyParser.text({ type: '*/*' }), testRoute);
router.post('/github', express.json(), githubRoute);
router.post('/solar', express.json(), solarRoute);
router.post('/jump', express.json(), jumpRoute);

module.exports = router;
