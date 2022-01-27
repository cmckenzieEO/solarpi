const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require("cors")

const repo = require('../../lib/repo');
const router = express.Router();

//router.get('/', express.json(), githubRoute);

const MessageTypes = require('../../lib/messageTypes');
const Schemas = require("../../lib/schema/schemaLoader")

//router.use(session)
// router.use(session({
//     resave: "false",
//     secret:'Keep it secret',
//     name:'uniqueSessionID',
//     saveUninitialized:true,
//     cookie: {maxAge: 10000,secure: false}
// }))
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

const registerSession = ({session},res) => {
        session.loggedIn = true
        session.email = res.locals.email
        console.log('bobber',session)
        //res.redirect('/dashboard')
        //res.session.loggedIn = true
        let log = {
            loggedIn: true,
            email: session.email
        }
        res.send(log)
        //console.log(res)
    }




const loginUser = (req,res) => {
    let {email,pass} = req.body
    console.log(email,pass)
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
    console.log(req)
    console.log('logout sess before: ',req.session)
    req.session.loggedIn = false
    req.session.email = null
    req.session = null
    //req.session.destroy()

    console.log('logout sess after: ',req.session)
    res.clearCookie('connect.sid', { path: '/' })
    res.clearCookie('uniqueSessionID', { path: '/' })
    //req.logout()
    res.redirect('./authenticate')
    //res.end()
    //res.send('Thank you! Visit again')
}

// const countRoute = (req,res) => {
//     repo.listCount()
//          .then(messages => {
//               res.set({corsheaders})
//               // res.setHeader('content-type', 'application/json');
//               // res.header("Access-Control-Allow-Origin", "*");
//               // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//               let count = Object.keys(messages).length
//               console.log("count: " + count)
//               res.end(JSON.stringify(count));
//               //res.end(JSON.stringify(messages));
//       })
//       .catch(e => {
//         console.error(e);
//         res.status(500);
//         res.setHeader('content-type', 'application/json');
//         res.end(JSON.stringify({ error: e.message }));
//       });
// };
//
// const countSubRoute = async (req, res) => {
//   //const subs = MessageTypes.MessageTypes;
//   const subs = await Schemas.pullFromDB()
//   for (const type in subs) {
//       if (req.params.sub == subs[type].subUrl) {
//           console.log("got it");
//           repo
//             .listSubCount(req.params.sub)
//             .then(count => {
//                 res.setHeader('content-type', 'application/json');
//                 res.header("Access-Control-Allow-Origin", "*");
//                 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//                 //let count = Object.keys(messages).length
//                 res.end(JSON.stringify(count));
//                 //res.end(JSON.stringify(messages));
//                 //res.end(JSON.stringify(count));
//             })
//             .catch(e => {
//                 console.error(e);
//                 res.status(500);
//                 res.setHeader('content-type', 'application/json');
//                 res.end(JSON.stringify({ error: e.message }));
//             });
//     }
//   }
// };
//router.use(cors())
//router.get('/', countRoute);
router.get('/authenticate', checkSession);
//router.post('/register',bodyParser.urlencoded(),registerUser2,registerSession);
router.post('/register',bodyParser.json(),registerUser2,registerSession);
//router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
//router.get('/:sub', countSubRoute);

module.exports = router;
