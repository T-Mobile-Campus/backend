const ttn = require("ttn");
const dotenv = require("dotenv");
require("dotenv").config();
var twilio = require('twilio');

var events = require('events');
var eventEmitter = new events.EventEmitter();

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');
var clientz = new twilio('AC6dbadb804366f1f0e80f4bec663ef9ce', '24626cd543596926a336ccfaa3d3051f');

let sioux = {}

sioux.eventEmitter = eventEmitter

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      sioux.lum = payload.payload_fields.lum
      sioux.vibr = payload.payload_fields.vibr
      sioux.eventEmitter.emit("update", {
        lum: sioux.lum,
        vibr: sioux.vibr
      })
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

sioux.message = (tonum, monum, mess) => {
  clientz.messages.create({
    to: tonum,
    from: monum,
    body: mess
  });
}




module.exports = sioux
