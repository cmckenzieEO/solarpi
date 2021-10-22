const mongoose = require('mongoose');

const Schemas = require('./declareSchemas');
const modelList = Schemas.models;
const schemaList = Schemas.schemas;
const watchList = Schemas.watches;

const limit = 25;

//const {schemasList,modelList} = {schemas,models} = Schemas;
//console.log(schemasList);
//const schemasJSON = require("../messageTypes.json");

const dbUrl = 'mongodb://localhost:27017/notifier';

//console.log(modelList);

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

//will populate schemas from messageTypes.json to avoid hardcoding.
//choosing a method and schema to match it for queries may be a challenge. will have to dynamically choose a schema for the subsList method

// uncomment to work #1
const TestMessage = mongoose.model('Message', Schemas.TestSchema);
//const SolarMessage = mongoose.model('solar', Schemas.SolarSchema);
//const JumpMessage = mongoose.model('jump', Schemas.JumpSchema);

//const TestMessage = mongoose.model('TestMessage', testSchema);

// uncomment to work #2
//models.push(TestMessage)
//models.push(SolarMessage)
//models.push(JumpMessage)

//const create = attrs => new Message(attrs).save();

// uncomment to work #3
// const createTest = attrs => new TestMessage(attrs).save();
// const createSolar = attrs => new SolarMessage(attrs).save();
// const createJump = attrs => new JumpMessage(attrs).save();

function findModel(name) {
    for (model in modelList) {
        //console.log("modelname" + modelList[model].modelName)
        if (modelList[model].modelName == name) {
            //console.log(modelList[model])
            return modelList[model];
        }
    }
}


const createSub = async (name,attrs) => {
    //console.log("createSub: name,attrs",name,attrs)
    let mod = findModel(name);
    //console.log(mod.modelName)
    //console.log(attrs)
    return new mod(attrs).save()//.save()
    //return model.save();
}

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

module.exports = {
    //createTest,
    //createSolar,
    //createJump,
    createSub,
    listTest,
    //listSolar,
    //listJump,
    listSub,
    listCount,
    listSubCount
 };
