//this class will handle callbacks, config changes, etc for schemas and messageTypes.

//when needing to change or configure, make calls to this class.

const mongoose = require('mongoose');
const events = require('events');
const {MessageTypes} = require('./../messageTypes'); //need to load dynamically
const {configEntry} = require('./../declareSchemas');

const config = new events.EventEmitter();


//events
mongoose.connection.on('open', err => {
    if (err) {
        console.log(err)
    }
    gatherFromDB().then(configs => {
        config.emit('connected', configs);
    })
})

/////////////public methods

const clearCurrentDBConfig = async () => {
    const cheese = await deleteModels()
    const cheesy = await configEntry.deleteMany({})
    return cheesy
    //console.log(mongoose.modelNames())
     //return configEntry.deleteMany({})
}
const overwriteConfig = (file) => {
    //verify file
    clearCurrentDBConfig().then(count => {
        //console.log(count)
        if (count) {
            loadFile(file)
        }
    })
}
const loadFromDB = async () => {
    //clearCurrentDBConfig().then(count => {
        //console.log(count)
        let res;
        deleteModels().then(count => {
            //console.log(count)
            if (count) {
                res = pullFromDB().then(pull => {
                    //console.log(pull)
                    setTypeModels(pull)
                    //saveToDB(true,pull)
                })
            }
        })
        return res
}

//////////enbd public methods


////////////added from Schemas




const TestSchema = new mongoose.Schema({
  text: String,
  url: String,
});

//saves loaded schemas to mongoose object
function setTypeModels(types) {
    let res;
    for (ty in types) {
        if (!mongoose.modelNames().includes(types[ty].subUrl)) {
            let sch = new mongoose.Schema(types[ty].messageSchema);
            let mod = mongoose.model(types[ty].subUrl, sch)
            mod.watch()
            res = 1;
        } else {
            //error stuff
            console.log("Duplicate Type entry found: ")
            //console.log(types[ty])
            res = new Error("Duplicate Type entry found");
        }


    }
    return res
}

const checkDB = () => {
    let configModels = configEntry.find()
    return configEntry.find().countDocuments()
}

const loadFile = (file) => {
    //let f = file //if valis file
    //console.log(file)
    let types = file
    saveToDB(true,types) // add option for temp usage of file for testing
    setTypeModels(types)
}

// const saveToDB = async (...types) => {
//     // console.log("config save:",types)
//     if (types.length = 1) types = types[0]
//     console.log("config save:",types)
//     for (type in types) {
//         //console.log("config save:",types[type])
//         let doc = new configEntry(types[type])
//         //need to validate
//         save = doc.save(function (err) {
//             if (err)  {
//                 throw new Error(err);
//             } else {
//                 //console.log()
//             }
//         })
//     }
// }
//multiple is boolean for more than one
const saveToDB = async (multiple,types) => {
    let save;
    if (multiple) {
        save = saveTypesToDB(types)
    } else {
        save = saveTypeToDB(types)
    }
    //console.log("save in saveToDB: ",save)
    return save;
}
const saveTypeToDB = async (types) => {
    let doc = new configEntry(types)
    //need to validate
    save = await doc.save()
    //console.log("save in saveType: ",save)
    return save
}
const saveTypesToDB = async (types) => {
    let save;
        for (type in types) {
            //console.log("config save:",types[type])
            let doc = new configEntry(types[type])
            //need to validate
            save = await doc.save()
        }
}

const deleteModels = async () => {
    let models = mongoose.modelNames()
    for (model in models) {
        if (models[model] != "MessageTypes") {
            mongoose.deleteModel(models[model])
        }
    }
    return mongoose.modelNames().length = 2
}

const gatherFromDB = () => {
    return configEntry.find()
}

const pullFromDB = () => {
    return configEntry.find()
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
            checkDB().then(count => {
                console.log("checkDB")
                if (count) {
                    console.log("checkDB count true")
                    loadFromDB()
                    //pullFromDB()
                } else {
                    console.log("checkDB count false")
                    loadFile(MessageTypes)
                }
            })
            // if (checkDB()) { //wont work. i forgot it will always return true
            //       // loadFromDB()
            //       //console.log("load from db")
            // } else {
            //       // loadFile(MessageTypes)
            // }
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
    overwriteConfig,
    pullFromDB,
    loadFromDB,
    saveToDB
}
