const mongoose = require('mongoose');

mongoose.set('debug', true);
const {MessageTypes} = require('./messageTypes');

const messageSchemas = [];
const configModels = [];
let messageModels = [];
const watches = [];



const schemaValidation = {
  validator: (value) => new mongoose.Schema(value),
  message: 'Time must be in the format hh:mm and be a valid time of the day.'
}

const messageSchema = new mongoose.Schema({
     //need to check if its a Schema
     messageSchema: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Why you no provide mSchema?"],
        // validate: schemaValidation,
        // misc: {
        //     type: 'Mixed'
        // }
    }
});

const displaySchema = new mongoose.Schema({
    displayTitle: {
        type: String,
        //default: () => title || text,
    },
    submittedAt: {
        type: String,
        default: "submittedAt"
    },
    status: {
        type: Array,
        default: ["submittedAt"]
    }
});

const configSchema = new mongoose.Schema({
    // default mongoose id = _id
    id: {
        type: Number,
        required: [true, "Why you no provide id?"],
    },
    title: String,
    subUrl: {
        type: String,
        required: [true, "Why you no provide subUrl?"],
        //match: /^[a-zA-Z0-9_-]*$/
    },
    //for now will not validate messageSchema
    // messageSchema: {
    //     type: messageSchema
    messageSchema: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Why you no provide mSchema?"],
           // validate: schemaValidation,
           // misc: {
           //     type: 'Mixed'
           // }
       //}
    },
    displaySchema: {
        type: displaySchema,
    },
    states: {
        type: Array,
    },
    style: {
        type: mongoose.Schema.Types.Mixed
    }
})

const configEntry = mongoose.model('MessageTypes', configSchema)
//let configEntry = mongoose.model(MessageTypes[type].title, configSchema)
let num = 0;

const initTypes = async () => {

    //const try = new configEntry
    //console.log(await configEntry.find().countDocuments())
    if (await configEntry.find().countDocuments() == 0) {
        for (type in MessageTypes) {

            let doc = new configEntry(MessageTypes[type])

            doc.save(function (err) {
                if (err)  {
                    //console.log(configSchema,"bob",MessageTypes[type])
                    throw new Error(err);
                } else {
                    console.log(num)
                }
                // saved!
            })
            //}).then(doc => console.log(doc));

            //configModels.push()
            //let doc = configModel.findOne({title: MessageTypes[type].title}, 'messageSchema');
            //const doc2 = cMod2.findOne({title: MessageTypes[type].title}, 'subUrl messageSchema').exec().then(docZ => console.log(docZ));
            //console.log(doc2)
            //let mod2 = mongoose.model(doc2.subUrl, new mongoose.Schema(doc2.messageSchema));
            //watches.push(mod.watch())


            //add sch to config schema matching type

            //const TestMessage = mongoose.model('Message', Schemas.TestSchema);
        }
    }



}

for ( type in MessageTypes) {
    let sch = new mongoose.Schema(MessageTypes[type].messageSchema);
    //let sch = new mongoose.Schema(MessageTypes[type]);
    let mod = mongoose.model(MessageTypes[type].subUrl, sch)
    watches.push(mod.watch())
    //messageModels.push(mod);
    messageModels.push(mod);
}



//
const TestSchema = new mongoose.Schema({
  text: String,
  url: String,
});

//ticket # will be id
//_id: Number, // to do this, i will need to extract ticket number and save it. maybe i can do this in zapier beffore sending the webhook
const SolarSchema = new mongoose.Schema({
  title: String,
  submittedAt: Date,
  requester: String,
  assignedTo: String,
  attachments: Boolean
});
//UI should allow for opening a page with more details
//this page should should allow assigning and state change
const JumpSchema = new mongoose.Schema({
  title: String,
  time: Date,
  user: String
});
//UI should allow to show a page with more details
//this should allow actions based on message
// const GithubSchema = new mongoose.Schema({
//
// });

//DB config save/load
//this will (for the most part mirror the messageTypes top-level schema)





module.exports = {
  TestSchema,
  messageSchemas,
  messageModels,
  watches,
  configEntry,
  initTypes
};
