const mongoose = require('mongoose');

//const Schemas = require('./declareSchemas');
//const Schemas = require('./schema');
//const schemaLoader = require('./schema/schemaLoader')
const Schemas = require('./schema/schemaLoader')
const configModel = Schemas.configSchema;
const limit = 25;

//const {schemasList,messageModels} = {schemas,models} = Schemas;
//console.log(schemasList);
//const schemasJSON = require("../messageTypes.json");


const dbUrl = 'mongodb://localhost:27017/notifier';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

Schemas.config.on('connected', (config) => {
        if (config.length < 3) {
            Schemas.clearCurrentDBConfig().then(count => {
                Schemas.initTypeModels(null,true)
            })
            //Schemas.initTypeModels(mongoose,null,true)
        } else {
            //init from DB
            Schemas.initTypeModels()
        }
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
        console.log('defaulted model to test')
    }
}

const createSub = async (name,attrs) => {
    let mod = findModel(name);
    return new mod(attrs).save()
}

const listSub = (name) => {
    //let retModel;
    return findModel(name).find().limit(limit).sort({_id: -1}).then(messages => messages.slice());
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

module.exports = {
    createSub,
    //listTest,
    listSub,
    listCount,
    listSubCount
 };
