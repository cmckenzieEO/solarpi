const MessageTypes = {
    Solar: { //types should have URI so the api knows where to be pointed
      id: 0,
      title: "SolarWinds",
      subUrl: "solar",
      uri: "https://api.samanage.com",
      messageSchema: {
         id: "Number",
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
     api: { //to hold api params (OAuth?,authType,baseURL,endpoints,params)
         baseURL: "https://api.samanage.com",
         auth: true,
         authType: "token", //validation. only certain types should be listed
         authHeader: [true, "X-Samange-Authorization"], // [true] for default or [true, "customheader"] validation method
         endpoints: "none",//map?
         params: ["incidents"], //or Map
         contentType: "application/json"
     },
     displayVars: {
         displayTitle: "title",
         submittedAt: "submittedAt",
         description: "description_no_html", //from API
         status: [
             "state",
             "attachments",
             "service",
             "sla",
             "submittedAt"
         ],
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
     displayStyle: {
         color: "orange",
         colorRGB: "rgba(249, 157, 28, 0.5)"
     },
     detailSchema: {
         //for parsing API response on details page
         id: "String",
         number: 'String',
         name: "String",
         description_no_html: "String",
         state: "String",
         priority: "String",
         category: {
             id: "String",
             name: "String"
         },
         subcategory: {
             id: "Number",
             name: "String"
         },
         assignee: {
             group_id: "String",
             is_user: "Boolean",
             id: "String",
             name: "String",
             email: "String"
         },
         requester: {
             id: "String",
             account_id: "String",
             user_id: "String",
             email: "String",
             name: "String"
         },
         created_at: "Date",
         updated_at: "Date",
         due_at: "Boolean",
         //sla_violations: [slaSchema?],
         number_of_comments: "Number",
         is_service_request: "String",
         //created by??
         resolved_by: {
             id: "Number",
             name: "String",
             email: "String",
         },
         href_account_domain: "String",
         //department: null, //obj
         //cc: ["String"], //maybe users
         custom_fields_values: [
             {
                 id: "Number",
                 custom_field_id: "Number",
                 name: "String",
                 value: "String",
                 attachment: "Boolean",
                 options: "String",
                 type: "Number",
                 type_name: "String",
                 //entity: null,
                 //user: null
             }
         ],
         origin: "String"
     },
 },

         //
         // submittedAt: 'Date',
         // requester: 'String',
         // assignedTo: 'String', //will be IT Support by default
         // attachments: 'Boolean',
         // service: 'Boolean', //If false, WebHook will not receive from Zapier (Zapier only works from Howlers)
         // sla: 'Boolean',
    //  },
    // },
    Jump: { //types should have URI so the api knows where to be pointed
      id: 1,
      title: "JumpCloud",
      subUrl: "jump",
      uri: "none",
      messageSchema: {
        title: 'String',
        submittedAt: 'Date',
        user: 'String',
        device: 'String'
    },
    displayVars: {
        displayTitle: "title",
        submittedAt: "submittedAt",
        status: [
            'title'
        ]
    },
    displayStyle : {
        colorRGB: "slateblue",
        colorRGB: "rgba(100,180,250, 0.5)"
    }
    },
    Test: {
          id: 100,
          //display: true,
          title: "Test",
          subUrl: "test",
          messageSchema: {
            id: "Number",
            text: 'String',
            date: 'Date',
            misc: {
                type: {}
            }
        },
        displayVars: {
            displayTitle: "text",
            submittedAt: "date",
            status: [
                "date"
            ]
        },
        displayStyle: {
            color: "green",
            colorRGB: "rgba(100,200,250, 0.5)"
        },
        detailSchema: {
            //for parsing API response on details page
            id: "String",
            number: 'String',
            name: "String",
        }
    }
}

module.exports = {
  MessageTypes
}

// export const styleChoice = {
//     solar: styles.solarCatWindow,
//     jump: styles.jumpCatWindow,
//     test: styles.testCatWindow
// }
// export const colorChoice = {
//     solar: "rgba(249, 157, 28, 0.4)",
//     jump: "rgba(100,200,200, 0.4)",
//     test: "rgba(100,180,250, 0.4)"
// }





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
