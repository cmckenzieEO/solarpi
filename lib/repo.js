const mongoose = require('mongoose');

const Schemas = require('./declareSchemas');
const modelList = Schemas.messageModels;
const schemaList = Schemas.schemas;
const watchList = Schemas.watches;
<<<<<<< HEAD
=======

const limit = 25;

//const {schemasList,modelList} = {schemas,models} = Schemas;
//console.log(schemasList);
//const schemasJSON = require("../messageTypes.json");
>>>>>>> 88672e020977a475cd6b23f2bbd21d5b8231faa7

const limit = 25;

const dbUrl = 'mongodb://localhost:27017/notifier';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

mongoose.connection.on('connected', err => {
    if (err) {
        console.log(err)
    }
    Schemas.initTypes()
        // .then(console.log("init complete"))
        //     .catch(err => console.log(err))
})

const TestMessage = mongoose.model('Message', Schemas.TestSchema); //temp backup
const listTest = () => TestMessage.find().limit(limit).then(messages => messages.slice().reverse()); //temp backup

function findModel(name) {
    for (model in modelList) {
        if (modelList[model].modelName == name) {
            return modelList[model];
        }
    }
}

const createSub = async (name,attrs) => {
    let mod = findModel(name);
    return new mod(attrs).save()
}

<<<<<<< HEAD
const listSub = (name) => {
    let retModel;
    retModel = findModel(name).find().limit(limit).sort({_id: -1}).then(messages => messages.slice().reverse());
    if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse()); //temp backup
    return retModel;
}

const listSubCount = (name) => {
    let retModel;
    retModel = findModel(name).find().countDocuments();
=======
 const listTest = () => TestMessage.find().limit(limit).then(messages => messages.slice().reverse());
// const listSolar = () => SolarMessage.find().then(messages => messages.slice().reverse());
// const listJump = () => JumpMessage.find().then(messages => messages.slice().reverse());

//const listSub = () => Message.find().then(messages => messages.slice().reverse());

const listSub = (name) => {
    let retModel;
    //console.log("name" + name)
    retModel = findModel(name).find().limit(limit).sort({_id: -1}).then(messages => messages.slice().reverse());
    // for (model in models) {
    //     console.log(models[model].modelName)
    //     if (models[model].modelName == name) {
    //         console.log("model found")
    //         retModel = models[model].find().then(messages => messages.slice().reverse());
    //     }
    // }
    if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse());
>>>>>>> 88672e020977a475cd6b23f2bbd21d5b8231faa7
    return retModel;
}

const listSubCount = (name) => {
    let retModel;
    //console.log("name" + name)
    retModel = findModel(name).find().countDocuments();
    // for (model in models) {
    //     console.log(models[model].modelName)
    //     if (models[model].modelName == name) {
    //         console.log("model found")
    //         retModel = models[model].find().then(messages => messages.slice().reverse());
    //     }
    // }
    //if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse());
    return retModel;
}

const listCount = () => {return listTest()};
//const listSubCount = (name) => {return listSub(name)};
<<<<<<< HEAD

const saveConfig = () => {

}

=======
>>>>>>> 88672e020977a475cd6b23f2bbd21d5b8231faa7

module.exports = {
    createSub,
    listTest,
    listSub,
    listCount,
    listSubCount
 };
