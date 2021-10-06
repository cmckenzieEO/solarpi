const queue = require('../../lib/queue');

const solarRoute = (req, res) => {
    console.log("json" + JSON.stringify(req.body));

    const {
        title: title
    } = req.body;

    const message = {
        title: `SolarWinds: ${title}`,
        url: 'prUrl',
    };

    const messagez = req.body;
    console.log(messagez);
    queue
        .send('solar', messagez)
            .then(() => {
                res.end('Received ' + JSON.stringify(messagez));
            })
            .catch(e => {
                console.error(e);
                res.status(500);
                res.end(e.message);
            });
};
module.exports = solarRoute;

/**
Message requirements from SolarWinds

Message comes this route:
Zapier -> SolarPi
(Refresh or getDetails) -> Get up-to-date info from Samanage API

message is custom made in Zapier

Message will be sent in JSON format, processed and saved to DB.

Process:
Zapier format Webhook to SolarPi url http.....
SolarPi receives message on /webhook/solar
Message is stripped/reformatted and sent in queue in channel 'solar'
Queue receives on channel 'solar' then saves to DB
Queue send message over WebSocket to listening web/app
Web/app updates to display info.

NOTE: Automations or changes done to ticket will not be visible unless a new GET is sent or user clicks on Card to get details.
This should refresh details but would also mean parsing from Samanage directly upon response
From Zapier is good for cards.
From Samange is good for details.
To Update card, will have to have refresh button on main page and parse Samange response to update DB and fields

I could also call Samanage API for new tickets in the Queue process before save to db to get realtime values from Samanage
Like:
Assignee: Would be IT Support but it may be better than manual input
Tag: Will be Howler and possibly Permissions
/doesn't seem worth it

LongPress can update. Should show loading wheel while gettingg and parsing Response

Original message wwill only have Zapier possible values. I should be able to declare all in Schema and only provide available ones until refresh

Will also need to handle tickets created outside of Zapier.... refresh seems to be the only possible way.
But if refrehing pulls from Samamange, I will need to update all DB entries to match Samamange res
and order them by ticket # despite the missing ServiceRequest entries

Updates done to DB will apply to cards upon reRender. Via new message or refresh

///////////////////////////////////////////
Just remembered....
Samanage has an integration thing...but it only works with processes. So nvm

Refresh refers to:
Opening Samanage details (will make calls for visible/all tickets in DB)
Long pressing Card (refreshes only that card)
Pressing refresh button

Ultimately once the user clicks the card for that message, it will gather all info from Samanage API to display in full form.
Or, open browser to the ticket page

UI View:
Headers for Samanage Verification

Browser:
Headers for Verif.
-or-
 Logged in user

 For example of returned incidents, view '../../lib/examples/incidents.json'

 Current Local DB MessageSchema:
 messageSchema: {
    title: String,
    ticketNum: String
    state: String,
    submittedAt: Date,
    requester: String,
    assignedTo: String,
    attachments: Boolean,
    service: Boolean //Will be true if from Zapier Webhook
    tags: [] //idk how to do arrays in Schema || Array of Strings Initial default: ['Howler']
        //comments: [{ body: String, date: Date }],
}

Will add: //looks like these below will have to populate from
slaBreached: Boolean  //not possible from Zapier
commentNum: Integer | String //not possible from Zapier
tag: String //not possible from Zapier. But it is possible in local
// I don't see tag in the returned fields. May have to auto apply since its from Zapier - Auto set Howler Tag
deviceName: String //Would need to do an API GET to Samamange:: getHardware/ https://api.samanage.com/hardwares.json?asset_tag=XXXXXXXX / ?owner=email

Parsing:
email = () => {
    let requester = Zapier.requester //which is email username --@energyogre
    //idk if Zapier can send the name
    if (name != email) requester = name
}



**/
