const MessageTypes = {
    Solar: {
      id: 0,
      title: "SolarWinds",
      subUrl: "solar",
      messageSchema: {
         title: "String",
         ticketNum: 'String',
         state: 'String',
         submittedAt: 'Date',
         requester: 'String',
         assignedTo: 'String', //will be IT Support by default
         attachments: 'Boolean',
         service: 'Boolean', //If false, WebHook will not receive from Zapier (Zapier only works from Howlers)
         sla: 'Boolean',
         misc: {
             type: {}
             //name: 'bob'
         }
     },
     states: {
         new: {
             text: "New",
             color: "lightblue",
             sla: true
         },
         assigned: {
             text: "Assigned",
             color: "lightgrey",
             sla: true
         },
         awaiting_input: {
             text: "Awaiting Input",
             color: "yellow",
             sla: false
         },
         resolved: {
             text: "Resolved",
             color: "lightgreen",
             sla: false
         },
         closed: {
             text: "Closed",
             color: "lightgrey",
             sla: false
         }
     },
     displaySchema: {
         displayTitle: "title",
         submittedAt: "submittedAt",
         status: [
             "state",
             "attachments",
             "service",
             "sla",
             "submittedAt"
         ]
     },
     style: {
         color: "orange",
         colorRGB: "rgba(249, 157, 28,0.5)"
     }

    },
    Jump: {
      id: 1,
      title: "JumpCloud",
      subUrl: "jump",
      messageSchema: {
        title: 'String',
        submittedAt: 'Date',
        user: 'String',
        device: 'String'
    },
    displaySchema: {
        displayTitle: "title",
        submittedAt: "submittedAt",
        status: [
            'title'
        ]
    },

    },
    Test: {
      id: 100,
      //display: true,
      title: "Test",
      subUrl: "test",
      messageSchema: {
        text: 'String',
        date: 'Date',
        misc: {
            type: {}
        }
    },
    displaySchema: {
        displayTitle: "text",
        submittedAt: "date",
        status: [
            "date"
        ]
    },
    }
}

module.exports = {
  MessageTypes
}

// these are the fields that will populate the statusbar. They are 'required' but are required to have default values
//could make obj with options
//For differring ways to display, it would be helpful to use objects, not array.
//Ex:
/**
displayTitle: {
    field: [ticketNum, title]
    delimiter: ": "      -or- {1, ': ', 2, '##'} for specific formatting
}
**/
//filed like 'state' will need to map to the 'states' object.
//this is in an effort to remove all hard-coded refs
//this will allow populating and styling dynamic fields based on variable input
//example fleshed-out:
/**
let ticketNum = '107'
displaySchema: {
    displayTitle: {
        fields: [ticketNum, title],
        delemiter: ['Ticket #', 0, ' : ', 1],
    },
    displayDate: {
        display: false,
        align: "right" // default "right"
        format: "MMM D hh:mm"
    }
   status: {
       state: {
           field: "state",
           mapping: 'states'
       }
   }
}
**/
