const mongoose = require('mongoose')
const {MessageTypes} = require('./messageTypes'); //need to load dynamically
const {configEntry} = require('./declareSchemas');




const TestSchema = new mongoose.Schema({
  text: String,
  url: String,
});

//saves loaded schemas to mongoose object
function setTypeModels(mon,types) {
    for (ty in types) {
        let sch = new mon.Schema(types[ty].messageSchema);
        let mod = mon.model(types[ty].subUrl, sch)
        mod.watch()
    }
}

const checkDB = () => {
    let configModels = configEntry.find()
    return configEntry.find().countDocuments()
}

const loadFile = (mon,file) => {
    //let f = file //if valis file
    //console.log(file)
    let types = file
    saveToDB(types) // add option for temp usage of file for testing
    setTypeModels(mon,types)
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

const deleteModels = () => {
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
        setTypeModels(mon,doc)
    })
}

const initTypeModels = (mon,file,useDefault) => {
    let f = file
    if (f) {
        //if valid file or error
          loadFile(f)
    } else {
        if (useDefault) {
            loadFile(mon,MessageTypes)
        } else {
            if (checkDB()) { //wont work. i forgot it will always return true
                  loadFromDB(mon)
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
    initTypeModels,
    TestSchema,
    gatherFromDB
}
