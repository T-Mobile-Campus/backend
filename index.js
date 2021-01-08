const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes.js')

app.use(router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})