//this class will handle callbacks, config changes, etc for schemas and messageTypes.

//when needing to change or configure, make calls to this class.

const mongoose = require('mongoose');
const events = require('events');
const {MessageTypes} = require('./../messageTypes'); //need to load dynamically
const {configEntry} = require('./../declareSchemas');

const config = new events.EventEmitter();


//events
mongoose.connection.on('connected', err => {
    if (err) {
        console.log(err)
    }
    gatherFromDB().then(configs => {
        config.emit('connected', configs);
    })
})

/////////////public methods

const clearCurrentDBConfig = async () => {
    console.log(await deleteModels().then(await configEntry.deleteMany({})))
    //console.log(mongoose.modelNames())
     //return configEntry.deleteMany({})
}
const overwriteConfig = (file) => {
    //verify file
    clearCurrentDBConfig().then(count => {
        console.log(count)
        if (count) {
            loadFile(file)
        }
    })
}

//////////enbd public methods


////////////added from Schemas




const TestSchema = new mongoose.Schema({
  text: String,
  url: String,
});

//saves loaded schemas to mongoose object
function setTypeModels(types) {
    for (ty in types) {
        let sch = new mongoose.Schema(types[ty].messageSchema);
        let mod = mongoose.model(types[ty].subUrl, sch)
        mod.watch()
    }
}

const checkDB = () => {
    let configModels = configEntry.find()
    return configEntry.find().countDocuments()
}

const loadFile = (file) => {
    //let f = file //if valis file
    //console.log(file)
    let types = file
    saveToDB(types) // add option for temp usage of file for testing
    setTypeModels(types)
}

const saveToDB = (types) => {
    for (type in types) {
        let doc = new configEntry(types[type])
        doc.save(function (err) {
            if (err)  {
                throw new Error(err);
            } else {
                //console.log()
            }
        })
    }
}

const deleteModels = async () => {
    let models = mongoose.modelNames()
    for (model in models) {
        if (models[model] != "MessageTypes") {
            mongoose.deleteModel(models[model])
        }
    }
}

const gatherFromDB = () => {
    return configEntry.find()
}

const loadFromDB = (mon) => {
    let configModels = configEntry.find().then(doc => {
        setTypeModels(doc)
    })
}

const initTypeModels = (file,useDefault) => {
    let f = file
    if (f) {
        //if valid file or error
          loadFile(f)
    } else {
        if (useDefault) {
            loadFile(MessageTypes)
        } else {
            if (checkDB()) { //wont work. i forgot it will always return true
                  loadFromDB()
                  //console.log("load from db")
            } else {
                  loadFile(MessageTypes)
            }
        }
    }
}

//saves schema to DB from POJO module or loads from DB. default = 'messageTypes.js'
// const initSaveSchema = (file) => {
//     //if file is valid type
//     //else error
//     //default MessageTypes
//     const f = file
//     if (!f) f = MessageTypes //add file check
//     //check database for entries. If none found, populate according to file
//     if (configEntry.find().countDocuments() == 0) {
//         setTypeModels(MessageTypes)
//         for (type in MessageTypes) {
//             // initTypeModels(Messagetypes[type])
//             let doc = new configEntry(MessageTypes[type])
//             doc.save(function (err) {
//                 if (err)  {
//                     throw new Error(err);
//                 } else {
//                     console.log(num)
//                 }
//             })
//         }
//     } else {
//         //let configModels =   configEntry.find({})
//         return new Error("Initialization already done.")
//
//         // for (model in configModels) {
//         //     let sch = new mongoose.Schema(configModels[model].messageSchema);
//         //     //let sch = new mongoose.Schema(MessageTypes[type]);
//         //     let mod = mongoose.model(configModels[model].subUrl, sch)
//         //     messageModels.push(mod)
//         // }
//     }
// }


module.exports = {
    config,
    initTypeModels,
    TestSchema,
    //methods
    clearCurrentDBConfig,
    overwriteConfig
}
