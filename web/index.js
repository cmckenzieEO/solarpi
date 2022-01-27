const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

 const app = express();

//console.log(MessageTypes)
//console.log(MessageTypes.MessageTypes)
store  = new session.MemoryStore;
//app.use(cookieParser())
app.use(session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    resave: false,
    saveUninitialized: false,
    path: '/',
    unset: 'destroy',
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
//app.options('*', cors())

// const checkSession = (req, res, next) => {
//     //let message;
//     console.log('bobr',req.session)
//     if(req.session.loggedIn) {
//         //if (req.path == '/auth/authenticate') return next()
//         res.set(corsHeader)
//         let msg = "User logged in according to session."
//         console.log(msg)
//         // message = {
//         //     logged: true,
//         //     email: req.session.email
//         // }
//         //res.send(JSON.stringify(msg))
//         next()
//          //res.end()
//     } else {
//         //res.set(corsHeader)
//         //res.status = "401"
//         console.log("User NOT logged in according to session.")
//         //res.sendStatus(401)
//         //res.setStatus(401)
//         res.status(401)
//         next()
//
//     }
// }

//app.use('/',(req,res) => checkSession(req,res))
//app.all('*',checkSession)

app.get('/api', async function(req, res) {
  //const axios.get('https://api.samanage.com/incidents/84236615.json')
  let id = req.query.id
  //console.log(id)
  let config = {
      url: `https://api.samanage.com/incidents/${id}.json`,
      headers : {
          'X-Samanage-Authorization' : 'Bearer Y21ja2VuemllQGVuZXJneW9ncmUuY29t:eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo3MTk1MTg3LCJnZW5lcmF0ZWRfYXQiOiIyMDIxLTA4LTAzIDEyOjMzOjUwIn0.oELgvwACEGaynaQ3AkJw07uOTI_3AUlFYzsXIfrPlRiEFo3QyhwPHUwhz_nHZ6_qzZpmJDGx2plyxVazGlAojg',
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
