const http = require('http');
const express = require('express');
const webhookRouter = require('./webhooks');
const listRouter = require('./list');
const configureWebSockets = require('./socket');
const cors = require("cors")

//import {MessageTypes} from '../lib/messageTypes';
const MessageTypes = require('../lib/messageTypes');

 const app = express();

//console.log(MessageTypes)
//console.log(MessageTypes.MessageTypes)

app.use('/webhooks', webhookRouter);
app.use('/list', listRouter);


app.use(cors());
app.options('*', cors())

 const server = http.createServer(app);
 configureWebSockets(server);

const { PORT = 3000 } = process.env;
server.listen(PORT);
console.log(`listening on port ${PORT}`);
