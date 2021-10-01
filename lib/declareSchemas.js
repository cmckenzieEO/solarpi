const mongoose = require('mongoose');
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


module.exports = {
  SolarSchema,
  JumpSchema,
  TestSchema
};
