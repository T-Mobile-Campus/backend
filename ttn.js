const ttn = require("ttn");
const dotenv = require("dotenv");
require("dotenv").config();
const mong = require('./dbnul');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const cron = require('node-cron');

const appID = process.env.TTN_APP_ID;
const accessKey = process.env.TTN_ACCESS_KEY;
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');
const sms = require("./sms.js");

let sioux = {}

sioux.getTreshold = async () => {
  await mong.fetch("Sioux", "threshold")
  sioux.threshold = mong.results[0].doc
}

sioux.getRoutine = async () => {
  await mong.fetch("Sioux", "auto_mode")
  sioux.routine = mong.results[0].doc
  sioux.auto_move(sioux.routine)
}

sioux.getTreshold()
sioux.getRoutine()

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

sioux.auto_move = (routine) => {
  console.log(sioux.task)
  if (sioux.task) {
    sioux.task.stop()
    sioux.task.destroy()   
  }
  if (routine >= 1) {
    sioux.task = cron.schedule(`* */${routine} * * * *`, function() {
    sioux.smoke_signal("oui","01")
  });
  }
}

sioux.message = (tonum,mess)=>{
  sms.message(tonum, mess);
}


module.exports = sioux
