const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes.js')
const sioux = require('./ttn.js')
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
    sioux.temp = data.temp
    socket.emit("update", {
      lum: sioux.lum,
      temp: sioux.temp
    })
  })
});


