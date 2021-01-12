const ttn = require("ttn");
const dotenv = require("dotenv");
require("dotenv").config();
var events = require('events');
var eventEmitter = new events.EventEmitter();

const appID = "le-super-lorawan-id734";
const accessKey = "ttn-account-v2.yUBNrE1zHg79McFMTqOC7wBjxswJlZ4zWDjabqFa61g";
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');

let sioux = {}

sioux.eventEmitter = eventEmitter

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      sioux.lum = payload.payload_fields.lum
      sioux.eventEmitter.emit("lum", sioux.lum)
      console.log(payload.payload_fields)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })

sioux.smoke_signal = (device, payload) => {
  client.send(device, payload,1)
  console.log('smoke signal sent')
}


module.exports = sioux
