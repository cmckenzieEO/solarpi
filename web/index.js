require('dotenv').config()


const http = require('http');
const express = require('express');
const session = require('express-session');
const app = express();

const axios = require('axios');

const webhookRouter = require('./webhooks');
const listRouter = require('./list');
const configRouter = require('./config');
const authRouter = require('./auth');
const configureWebSockets = require('./socket');
const cors = require("cors")

//import {MessageTypes} from '../lib/messageTypes';
const MessageTypes = require('../lib/messageTypes');

process.env.DEBUG = 'express-session'

store  = new session.MemoryStore;

app.use(session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    resave: false,
    saveUninitialized: false,
    path: '/',
    //unset: 'destroy',
    cookie: {secure: false}
}))


app.use('/webhooks', webhookRouter);
app.use('/list', listRouter);
app.use('/config', configRouter);
app.use('/auth', authRouter);

app.use(cors({
  origin: 'http://localhost:19006',
  credentials: true
}))


app.get('/api', async function(req, res) {
  //const axios.get('https://api.samanage.com/incidents/84236615.json')
  let id = req.query.id
  let config = {
      url: `https://api.samanage.com/incidents/${id}.json`,
      headers : {
          'X-Samanage-Authorization' : `Bearer ${process.env.SW_TOKEN}`,
          'Accept' : 'application/json'
      }
  }
  let bob = await axios.get(`https://api.samanage.com/incidents/${id}.json`,config).then(response => {
            //console.log(response.data)
            res.send(response.data)
      }).catch(error => {
              //console.log("error",error.status)
              res.send(error)
          })
  });

 const server = http.createServer(app);
 configureWebSockets(server);

const { PORT = 3000 } = process.env;
server.listen(PORT);
console.log(`listening on port ${PORT}`);
