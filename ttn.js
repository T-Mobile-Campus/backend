const ttn = require("ttn");
const dotenv = require("dotenv");
require("dotenv").config();
var events = require('events');
var eventEmitter = new events.EventEmitter();

<<<<<<< Updated upstream
const appID = "le-super-lorawan-id734";
const accessKey = "ttn-account-v2.yUBNrE1zHg79McFMTqOC7wBjxswJlZ4zWDjabqFa61g";
=======
const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
>>>>>>> Stashed changes
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');
const sms = require("./sms.js");

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
<<<<<<< Updated upstream


=======
sioux.message = (tonum,mess)=>{
  sms.message(tonum, mess);
}
>>>>>>> Stashed changes
module.exports = sioux
