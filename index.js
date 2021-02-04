const express = require('express')
const mong = require('./dbnul.js')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes.js')
const sioux = require('./ttn.js')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// const cors = require('cors')

// app.use(cors)

app.use(router)

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})


const io = require('socket.io')(server, {
  cors: {
    // origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// SOCKETS 


io.on("connection",  function (socket) {
  console.log(`${socket.id} connected. sent lum : ${sioux.lum}`);
  socket.emit("update", {
    lum: sioux.lum,
    temp: sioux.temp
  })
  sioux.eventEmitter.on("update", data => {
    sioux.lum = data.lum
    sioux.vibr = data.vibr
    socket.emit("update", {
      lum: sioux.lum,
      vibr: sioux.vibr
    })
  })
});

sioux.eventEmitter.on("update", data => {
  if (process.env.MODE == 'dev') {
    insert_seconds(data.vibr)
    if (Math.max(...sioux.vibr)> sioux.threshold){
      insert_high_values(data.vibr)
    }
  }

if (Math.max(...sioux.vibr)> sioux.threshold){
  sioux.message("+33695382555", 'CA VIBRE TROP ' + Math.max(...sioux.vibr))
  }
})

const insert_seconds = async data => {
    entry = {
      vibr: Math.max(...data),
      date: new Date(Date.now()) 
    }
    try {
      res = await mong.addDoc("Sioux", "last_12_hours", entry)
      console.log(res)
    }
    catch (e) {
      console.error(e)
    }
}

const insert_high_values = async data => {

  entry = {
    vibr: Math.max(...data),
    date: new Date(Date.now()) 
  }
  try {
    res = await mong.addDoc("Sioux", "High_values", entry)
    console.log(res)
  }
  catch (e) {
    console.error(e)
  }
}




