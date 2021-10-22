Flesh out DB entries with schemas
When to update cards (see below)
Details page when pressed
Different View Styles
Remove unneeded extra views (MessageCards)
Settings
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
