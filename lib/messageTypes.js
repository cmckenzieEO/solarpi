const mongoose = require('mongoose');

const MessageTypes = {
    Solar: {
      id: 0,
      title: "SolarWinds",
      subUrl: "solar",
      messageSchema: {
        text: String,
        url: String,
      }
    },
    Jump: {
      id: 1,
      title: "JumpCloud",
      subUrl: "jump",
      messageSchema: {
        text: String,
        url: String,
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
