Flesh out DB entries with schemas
When to update cards (see below)
Details page when pressed
Different View Styles
Remove unneeded extra views (MessageCards)
Settings


////////////// APIs
Jumpcloud user lockout




///////////// Modularity
Abstract schemas and DB saves as much as possible. If hitting a road block for hard-coding, abstracting may be a pointless adventure. (at least the schema loading is abstracted)
Was able to save fields according to Schema dynamically into DB.
My only current problem is specific changes. EX: Solar: assignedTo, tags, service.
This will need to be defaulted as it won't get the value from Smamange.
However, I can set it manually in Zapier. Since Zapier will technically mimic a POST (it is a POST to my API) the values can be set there without breaking expected functionality from abstracted Webhook sources
Currently I have hard coded Queue routes: Solar and Test. webhooks/index.js

Save Messagetypes in DB. this will allow methods to modify it as well as pulling raw JSON

RabbitMQ also dynamically creates connection channels

Dynamic:
MessageSchemas
RabbitMQ
CatWindows
Card Data displaying (working on it)


///////////// Futures
SolarWinds comments/state change/ etc.
Jump run commands



















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
