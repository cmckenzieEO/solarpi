const mongoose = require('mongoose');

const Schemas = require('./declareSchemas');
const modelList = Schemas.messageModels;
const schemaList = Schemas.schemas;
const watchList = Schemas.watches;
const limit = 25;

//const {schemasList,modelList} = {schemas,models} = Schemas;
//console.log(schemasList);
//const schemasJSON = require("../messageTypes.json");


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

const listSub = (name) => {
    let retModel;
    retModel = findModel(name).find().limit(limit).sort({_id: -1}).then(messages => messages.slice().reverse());
    if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse()); //temp backup
    return retModel;
}

const listSubCount = (name) => {
    let retModel;
    retModel = findModel(name).find().countDocuments();
    return retModel;
}
 //const listTest = () => TestMessage.find().limit(limit).then(messages => messages.slice().reverse());


const listCount = () => {return listTest()};

const saveConfig = () => {

}

module.exports = {
    createSub,
    listTest,
    listSub,
    listCount,
    listSubCount
 };
