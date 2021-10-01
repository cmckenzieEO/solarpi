const mongoose = require('mongoose');

const schemas = require('./declareSchemas');
//const schemasJSON = require("../messageTypes.json");

const dbUrl = 'mongodb://localhost:27017/notifier';

//console.log(JSON.parse(schemasJSON));

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);

let models = []
//will populate schemas from messageTypes.json to avoid hardcoding.
//choosing a method and schema to match it for queries may be a challenge. will have to dynamically choose a schema for the subsList method
const TestMessage = mongoose.model('Message', schemas.TestSchema);
const SolarMessage = mongoose.model('solar', schemas.SolarSchema);
const JumpMessage = mongoose.model('jump', schemas.JumpSchema);
//const TestMessage = mongoose.model('TestMessage', testSchema);

models.push(TestMessage)
models.push(SolarMessage)
models.push(JumpMessage)

//const create = attrs => new Message(attrs).save();
const createTest = attrs => new TestMessage(attrs).save();
const createSolar = attrs => new SolarMessage(attrs).save();
const createJump = attrs => new JumpMessage(attrs).save();



const listTest = () => TestMessage.find().then(messages => messages.slice().reverse());
const listSolar = () => SolarMessage.find().then(messages => messages.slice().reverse());
const listJump = () => JumpMessage.find().then(messages => messages.slice().reverse());

//const listSub = () => Message.find().then(messages => messages.slice().reverse());


const listSub = (name) => {
    let retModel;
    console.log("name" + name)
    for (model in models) {
        console.log(models[model].modelName)
        if (models[model].modelName == name) {
            console.log("model found")
            retModel = models[model].find().then(messages => messages.slice().reverse());
        }
    }
    if (!retModel) retModel = TestMessage.find().then(messages => messages.slice().reverse());
    return retModel;
}


module.exports = {
    createTest,
    createSolar,
    createJump,
    listTest,
    listSolar,
    listJump,
    listSub
 };
