const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes.js')
const sioux = require('./ttn.js')
const cors = require('cors')

app.use(cors)

app.use(router)

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

// const io = require('socket.io')(server);


// io.on("connection",  function (socket) {
//   console.log("connected:" + socket.id);
//   socket.emit('t', {ok:true})
// });

// io.on('lum', lum => {
//   console.log(lum)
// })

