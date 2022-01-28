const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require("cors")

const repo = require('../../lib/repo');
const router = express.Router();

//router.get('/', express.json(), githubRoute);

const MessageTypes = require('../../lib/messageTypes');
const Schemas = require("../../lib/schema/schemaLoader")

router.use(cors({
  origin: 'http://localhost:19006',
  credentials: true
}))

const corsHeader = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:19006",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Access-Control-Allow-Credentials': 'true'
}

const checkSession = (req, res) => {
    //let message;
    //if (req.path == '/*')
    console.log('checkSession',req.session)
    console.log('SessionID' + session.sessionID)
    if(req.session.loggedIn) {
        res.set(corsHeader)
        let msg = "User logged in according to session."
        let log = {
            loggedIn: true,
            email: session.email
        }
        res.json(log)
        // res.end()
    } else {
        res.set(corsHeader)
        res.status = "401"
        let msg = "User NOT logged in according to session."
        console.log(msg)
        res.sendStatus(401)
    }
}

const registerUser = (req,res) => {
    let {email,pass,displayName,role} = req.body //need to confirm email? and check role exists
    let info = req.body
    //console.log(email,pass,displayName,role)
    repo.registerUser()
        .then(ab => {
            res.setHeader(corsHeaders)
            res.end()

                //encrypted
                //session?
            //do i need anything else?
        }).catch(error => {
            console.error(e);
            res.status(500);
            res.set(corsHeader)
            //res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
        })
    }

const registerUser2 = (req,res,next) => {
    // Actual implementation would check values in a database
    console.log(req.body)
    if(req.body.email == 'pi' && req.body.pass == 'pi') {
        res.locals.email = req.body.email
        next()
    } else {
        res.sendStatus(401)
    }
}

const registerSession = (req,res) => {
        req.session.loggedIn = true
        req.session.email = res.locals.email
        let log = {
            loggedIn: true,
            email: session.email
        }
        res.send(log)
    }

const loginUser = (req,res) => {
    let {email,pass} = req.body
    //console.log(email,pass)
    repo.loginUser()
        .then(ab => {
            //encrypt
            //session
            res.setHeader(corsHeaders)
            res.end()
        })
        .catch(error => {
            console.error(e);
            res.status(500);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
        })
}

const logoutUser = (req,res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
}

router.get('/authenticate', checkSession);
//router.post('/register',bodyParser.urlencoded(),registerUser2,registerSession);
router.post('/register',bodyParser.json(),registerUser2,registerSession);
//router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
//router.get('/:sub', countSubRoute);

module.exports = router;
