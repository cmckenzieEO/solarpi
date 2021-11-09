Flesh out DB entries with schemas
When to update cards (see below) --DONE
Details page when pressed
Different View Styles
Remove unneeded extra views (MessageCards)
Settings/Config
AUTH


////////////// APIs
Jumpcloud user lockout




///////////// Modularity
Abstract schemas and DB saves as much as possible. If hitting a road block for hard-coding, abstracting may be a pointless adventure. (at least the schema loading is abstracted)
Was able to save fields according to Schema dynamically into DB.
My only current problem is specific changes. EX: Solar: assignedTo, tags, service.
This will need to be defaulted as it won't get the value from Smamange.
However, I can set it manually in Zapier. Since Zapier will technically mimic a POST (it is a POST to my API) the values can be set there without breaking expected functionality from abstracted Webhook sources
Currently I have hard coded Queue routes: Solar and Test. webhooks/index.js -- FIXED - Now dynamic. Takes a subUrl for the queue channel

Save Messagetypes in DB. this will allow methods to modify it as well as pulling raw JSON

RabbitMQ also dynamically creates connection channels

Dynamic:
MessageSchemas
RabbitMQ
CatWindows
Card Data displaying (working on it) - Some things are still not abstracted.
    Title, and statusbar should(do) populate according to Schema.

Should save a DB table for config. Populate according to schemas and API to UPDATE/GET config

mongoose.Models persist globally. creating them from thee db on load and reloading them upon config change/reload would make more sense than trying to load them from the db every message received.
Connections also accept models and persist only for the connection. meaning, a disconnect and reconnect will reset current models. If other options may need resetting, this may be the preffered choice. Otherwise, not clear on pros and cons
Options are:
Delete and remake mongoose.models
Disconnect and reconnect connection to recreate model changes

remember: Config and messagetypes are different things.

Current:
There is a class called 'schemaLoader' this handles the schema,models, and messageType actions.
this class callse event on('connected') when mongoose connection is made. This event allows control over how the init messagetypes are loaded via .intiTypeModels() (config should be made this way too)
Methods are available to pull messagetypes from a file(saves to DB => loads from DB), from the DB (loads from DB)
Loading from file or DB removes old models except for Config model (needs vars in code to be renamed) 'MessageTypes'
Method available to overwrite current messageTypes. This is after init and changes need to be made.
LoadFromFile is capable of providing a custom file or using default /lib/messagetypes.js. There needs to be file verification
API is avaliable for polling messageTypes and adding a new one. After such call, (i think) it auto re-loads. (Saves to DB => loads from DB) (this will also remove old models)
API takes a query param for ?multiple true for an obj or array containing multiple. false or not-provided for a single entry.

Tested:
Creating new Type from API, shows new category on reload, counts messages. Able to send a new message via POST to new messageType, auto update on new message.
This was only possible after moving all methods to pull from DB. Including creating queue channels

possible schemaLoader methods:
LoadFromDB: Deletes old models, pulls from DB, creates new models.
PullFromDB: Gathers types from DB (no other action)
LoadFromFile: Reads custom file, saves to DB, removes old models, loads from DB
initTypeModels: initial load.
    (): loads from DB
    (file,default): custom file, or use default file
        (null,true): use default file (messageTypes.js)






///////////// Futures
SolarWinds comments/state change/ etc.
Jump run commands

///////////// Display Schema

Message fields specified as 'title', 'date', or 'status' are auto saved to props value for each card.
there is a 'displaySchema' for this.
since different messages will have different fields, the important ones cann be defined here.
For example, if the message will not contain a 'title' field, an existing field can be specified as the title.
displaySchema: {
    title: "text"
}
this way, the 'text' field will act as the title.
each field has its default that matches the name of the field. (the default 'title' will use the 'title' field if exists or not specified).
displaySchema fields:
title
submittedAt

///////////// UPDATING
Live updates are read from DB. Refresh button per category.
Live updates:
    Mongoose .watch() sends message through Socket. This message updates the 'changes' field and re-renders the component
        These are dynamically added to each dynamically created schema dynamically read from MessageTypes
    props.changes and a hook to listen for the change, then render
Refresh Button:
    Method is a 'reducer' on mainScreen and passed to CatWindow.
        Clears 'changes' field to give a refresh.
    Button shouldnt be needed as Live updates should show automatically as well as play sound.

Updates are done upon change in db. New Message or Change in fields.
I have pieced this together and it is VERY sloppy. Please clean and code properly

//////////////// LIMIT CARDS

For now i will hard code limits in. Will need a config file forr many options. This will have to be done over API.

////// Considerations

When to refresh Cards?
1. Show a certain amount on front page? ($maxV)(seems pointless to show 10+ cards)
2. Could refresh all cards on page (limited($maxV)) or no? (refer to #1))
3. Could refresh only visible or max of ($maxU) (if limited to small number($maxV) there is no need for this)
    a. To do this, I would need to give Visual indicator of un-refreshed cards when scrolling
4. Update previous cards upon new message
5. Update previous cards upon Details viewing (since an API call will be made anyway)
6. Update on Refresh
NOTE: Combinations of these are allowed

Thinking...
1, 4, 5, 6



When getting config, should check for updates in DB.

Init load, save to local cache. check for updates at every relevant point, compared to a settable difference time.
if newer, update config. Saves on DB calls or API calls

Proper error messages

Calls are mostly migrated to DB calls. Should consider saving to local instance and running update checks periodically.
Calls need error checking and proper async.
Problem with init loading. Runs twice. (Check 'connected' event, it runs twice)

I have schemas in DB with limited validation. Detailed validation with methods, etc. should be built.

Cards category updates automatically on every new (sub)message (this is done with model.watch() on a replica set(also, is probably why the 'connected' fires twice)). Also there is a refresh button per category. will make a global refresh button
