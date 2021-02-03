var twilio = require('twilio');
const sioux = require('./ttn.js');
var client = new twilio('AC6dbadb804366f1f0e80f4bec663ef9ce', '24626cd543596926a336ccfaa3d3051f');
var arr = ["+33755446464","+33629052337", "+33695382555"];
sioux.eventEmitter.on("update", data => {
  if (Math.max(...sioux.vibr)> 700){
    arr.forEach(function(value){console.log(value);
client.messages.create({
    
    to: value ,
    from: '+15086717310',
    body: 'CA VIBRE TROP ' + Math.max(...sioux.vibr)
  });
})
}
})

