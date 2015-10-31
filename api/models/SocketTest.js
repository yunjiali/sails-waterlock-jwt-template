/**
* SocketTest.js
*
* @description :: Socket test message
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    msg: {
      type: "string",
      required: true
    },
    sender: {
      type: "string",
      required: true
    }
  }
};

