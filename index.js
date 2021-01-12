const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const router = require('./routes.js')
<<<<<<< HEAD
const sioux = require('./ttn.js')
=======
>>>>>>> 74abc4f8db41d65946afee567eded767e8846a63
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
<<<<<<< HEAD
    // origin: "http://localhost:8080",
    methods: ["GET", "POST"]
=======
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["sioux"],
    credentials: true
>>>>>>> 74abc4f8db41d65946afee567eded767e8846a63
  }
});


io.on("connection",  function (socket) {
<<<<<<< HEAD
  console.log(`${socket.id} connected. sent lum : ${sioux.lum}`);
  socket.emit("lum", sioux.lum)
  sioux.eventEmitter.on("lum", data => {
    sioux.lum = data
    socket.emit("lum", sioux.lum)
  })
});

=======
  console.log("connected:" + socket.id);
  sioux.eventEmitter.on("lum", data => {
    socket.emit("lum", data)
  })
});

const sioux = require('./ttn.js')

>>>>>>> 74abc4f8db41d65946afee567eded767e8846a63

