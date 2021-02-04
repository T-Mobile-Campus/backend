const dotenv = require("dotenv");
require("dotenv").config();
var twilio = require('twilio');
const sioux = require('./ttn.js');
const twilio_sid = process.env.TWILIO_SID
const twilio_auth = process.env.TWILIO_AUTH
const twilio_num = process.env.TWILIO_NUM
var client = new twilio(twilio_sid, twilio_auth);
sioux.eventEmitter.on("update", data => {
  if (Math.max(...sioux.vibr)> 7000){
    arr.forEach(function(value){console.log(value);
client.messages.create({
    
    to: value ,
    from: twilio_num,
    body: 'CA VIBRE TROP ' + Math.max(...sioux.vibr)
  });
})
}
})

