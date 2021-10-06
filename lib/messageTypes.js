const mongoose = require('mongoose');

const MessageTypes = {
    Solar: {
      id: 0,
      title: "SolarWinds",
      subUrl: "solar",
      messageSchema: {
         title: String,
         ticketNum: String,
         state: String,
         submittedAt: Date,
         requester: String,
         assignedTo: String, //will be IT Support by default
         attachments: Boolean,
         service: Boolean //If false, WebHook will not receive from Zapier (Zapier only works from Howlers)
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
     }
    },
    Jump: {
      id: 1,
      title: "JumpCloud",
      subUrl: "jump",
      messageSchema: {
        title: String,
        submittedAt: Date,
        user: String,
        device: String
      }
    },
    Test: {
      id: 100,
      title: "Test",
      subUrl: "test",
      messageSchema: {
        text: String
      }
    }
}

module.exports = {
  MessageTypes
}
