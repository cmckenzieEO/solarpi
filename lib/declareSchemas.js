const mongoose = require('mongoose');

//mongoose.set('debug', true);
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
    },
    states: {
        type: Array,
    },
});
const viewSchema = new mongoose.Schema({
        visible: {
            type: Boolean,
            default: true
        },
        listStyle: {
            type: String,
            default: "Card-List"
        },
        color: {
            type: String,
            default: "rgba(249, 157, 28,0.5)"
        },
        colorRGB: {
            type: String,
            default: "rgba(255, 255, 255,0.5)"
        },
        limit: {
            type: Number,
            default: 25
        }
})

const detailsSchema = new mongoose.Schema({
    detailSchema: {
        type: mongoose.Schema.Types.Mixed,
        //required: [true, "Why you no provide detailSchema?"]
    }
})

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
    displayVars: {
        type: displaySchema
    },

    displayStyle: {
        type: viewSchema
    },
    detailSchema: {
        type: mongoose.Schema.Types.Mixed,
    }
})

///////// USER schema ///////
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    displayName: { //default to email || later match to samanage name
        type: String
    },
    accessTypes: { //types user can access. typesAccess further describes permissions
        types: {
            type: [String] //matches subUrl of type user can view
        },
        typesAccess: { //{role: requester} this is for usage that doesnt support roles. [{TypeName}, {accesslevel}]
            type: Map,
            of: String
        },
    },
    role: { //named roles [type,roleName] || for ex: samanage will save role name
        admin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: Map,
            of: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    apiTokens: { //encrypted api tokens || [Type,encryptedToken]
        type: Map,
        of: String
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
            //const configEntry = mongoose.model('MessageTypes', configSchema)
            //let modelTemp = mongoose.model('MessageTypes', configSchema)
            initTypeModels(Messagetypes[type])
            let doc = new configEntry(MessageTypes[type])

            doc.save(function (err) {
                if (err)  {
                    //console.log(configSchema,"bob",MessageTypes[type])
                    throw new Error(err);
                } else {
                    console.log("hi"+num)
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
    } else {
        //pull from db
        for (type in MessageTypes) {
            //initTypeModels(type)
        }

        let configModels = await configEntry.find({})
        console.log("//////// CONFIG MODELS //////////",configModels)
        for (model in configModels) {
            let sch = new mongoose.Schema(configModels[model].messageSchema);
            //let sch = new mongoose.Schema(MessageTypes[type]);
            let mod = mongoose.model(configModels[model].subUrl, sch)
            messageModels.push(mod)
        }


    }



}

// for ( type in MessageTypes) {
//     let sch = new mongoose.Schema(MessageTypes[type].messageSchema);
//     //let sch = new mongoose.Schema(MessageTypes[type]);
//     let mod = mongoose.model(MessageTypes[type].subUrl, sch)
//     watches.push(mod.watch())
//     //messageModels.push(mod);
//     messageModels.push(mod);
// }

async function initTypeModels(type) {
    let sch = new mongoose.Schema(MessageTypes[type].messageSchema);
    let mod = mongoose.model(MessageTypes[type].subUrl, sch)
    watches.push(mod.watch())
    //messageModels.push(mod);
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

const getUserSchema = () => {
    mongoose.model('user',userSchema)
    return userSchema
}

module.exports = {
  TestSchema,
  messageSchemas,
  messageModels,
  watches,
  configEntry,
  initTypes
};
