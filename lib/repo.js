const mongoose = require('mongoose');

//const Schemas = require('./declareSchemas');
//const Schemas = require('./schema');
//const schemaLoader = require('./schema/schemaLoader')
const Schemas = require('./schema/schemaLoader')
const {MessageTypes} = require('./messageTypes');
//const configModel = Schemas.configSchema;
let limit = 25;

//const {schemasList,messageModels} = {schemas,models} = Schemas;
//console.log(schemasList);
//const schemasJSON = require("../messageTypes.json");


const dbUrl = 'mongodb://localhost:27017/notifier';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

//custom config loading
Schemas.config.on('connected', (config) => {
    let overwrite = true;
    console.log("connected")
        if (config.length < 3) {
            Schemas.clearCurrentDBConfig().then(count => {
                Schemas.initTypeModels(null,true)
            })
            //Schemas.initTypeModels(mongoose,null,true)

///////////OVERWRITE?????????????????????????????????????????????
        } else if (overwrite) {
            Schemas.overwriteConfig(MessageTypes)
///////////OVERWRITE?????????????????????????????????????????????
        } else {
            //init from DB
            Schemas.initTypeModels()
        }

        // let overwrite = true;
        // if (overwrite) {
        //
        // }

})

// mongoose.connection.on('connected', err => {
//     if (err) {
//         console.log(err)
//     }
//     //Schemas.initTypeModels().then(console.log("init complete"))
//     //Schemas.initTypeModels(null,true).then(console.log("init complete"))
//         // .then(console.log("init complete"))
//         //     .catch(err => console.log(err))
// })


const TestMessage = mongoose.model('Message', Schemas.TestSchema); //temp backup
const listTest = () => TestMessage.find().limit(limit).then(messages => messages.slice().reverse()); //temp backup

//can change this to get modelName() from global mongoose instance
function findModel(name) {
    //console.log("//////// Message MODELS //////////",messageModels)
    // for (model in messageModels) {
    //     if (messageModels[model].modelName == name) {
    //         return messageModels[model];
    //     }

     //}
    console.log(mongoose.modelNames());
    let mod = mongoose.model(name)
    if (mod) {
        return mod
    } else {
        return mongoose.model('test')
        //console.log('defaulted model to test')
    }
}

const createSub = async (name,attrs) => {
    let mod = findModel(name);
    return new mod(attrs).save()
}

const listSub = (name,mod) => {
    let order = -1 //set to config value later
    if (mod.size > 0) {
        if (mod.has('limit')) {
            if (mod.get('limit') == 'latest')
            limit = 1
            order = -1
        }
    }
    //let retModel;
    return findModel(name).find().limit(limit).sort({_id: order}).then(messages => messages.slice());
    //if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse()); //temp backup
    //return retModel;
}

const listSubCount = (name) => {
    return findModel(name).find().countDocuments();
}


 //const listTest = () => TestMessage.find().limit(limit).then(messages => messages.slice().reverse());


const listCount = () => {return listTest()};

const saveConfig = () => {

}

const registerUser = (info) => {
    let userSchema = Schemas.getUserSchema()
    let mod = findModel('user');
    let user = mongoose.sanitizeFilter(info)
    return new mod(user).save();
    // const docs = await mod.save({
    //     email: info.email,
    //     displayName: info.displayName || info.email
    // }).setOptions({ sanitizeFilter: true });
    //return new mod(info).save()
}


module.exports = {
    createSub,
    //listTest,
    listSub,
    listCount,
    listSubCount
 };
