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
    insert_seconds(data.vibr)
    socket.emit("update", {
      lum: sioux.lum,
      vibr: sioux.vibr
    })
  })
});


// INSERT

const insert_seconds = data =>  {
  data.forEach((seconde,i) => {
    entry = {
      vibr: seconde,
      date: new Date(Date.now() - 6000 - (i * 1000) ) 
    }
    try {
     mong.addDoc("Sioux", "last_12_hours", entry)
    }
    catch (e) {
      console.error(e)
    }
    // mong.addDoc("Sioux", "last_12_hours", entry)
  });
}


