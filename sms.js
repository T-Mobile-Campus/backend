const dotenv = require("dotenv");
require("dotenv").config();
var twilio = require('twilio');
const sioux = require('./ttn.js');
const twilio_sid = process.env.TWILIO_SID
const twilio_auth = process.env.TWILIO_AUTH
const twilio_num = process.env.TWILIO_NUM
var client = new twilio(twilio_sid, twilio_auth);
var sms = {};
sms.client = client;
sms.twilio_num = twilio_num;
sms.message = (tonum, mess) => {
  let arf = sms.client.messages.create({    
    to: tonum,
    from: sms.twilio_num,
    body: mess
  }).catch(res => console.log(res))
  console.log(arf)
}
module.exports = sms