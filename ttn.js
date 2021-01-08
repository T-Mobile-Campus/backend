// import { data, application } from "ttn"
const ttn = require("ttn")
const appID = "le-super-lorawan-id734"
const accessKey = "ttn-account-v2.yUBNrE1zHg79McFMTqOC7wBjxswJlZ4zWDjabqFa61g"
const client = new ttn.DataClient(appID, accessKey, 'eu.thethings.network:1883');

client.send("oui", "01", 1)
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload.payload_fields)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
