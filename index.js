const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes.js')
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
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["sioux"],
    credentials: true
  }
});


io.on("connection",  function (socket) {
  console.log("connected:" + socket.id);
  sioux.eventEmitter.on("lum", data => {
    socket.emit("lum", data)
  })
});

const sioux = require('./ttn.js')


