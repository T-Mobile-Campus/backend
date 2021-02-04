const ttn = require("ttn");
const dotenv = require("dotenv");
require("dotenv").config();
const mong = require('./dbnul');
var events = require('events');
var eventEmitter = new events.EventEmitter();


const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');
const sms = require("./sms.js");

let sioux = {}

sioux.getTreshold = async () => {
  await mong.fetch("Sioux", "threshold")
  sioux.threshold = mong.results[0].doc
}

sioux.getTreshold()

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

sioux.message = (tonum,mess)=>{
  sms.message(tonum, mess);
}


module.exports = sioux
