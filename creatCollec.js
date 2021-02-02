
const mong = require('./dbnul.js')


mong.client.db('test').createCollection("last_12_hours", { capped : true, size : 5242880, max : 60*12 } )