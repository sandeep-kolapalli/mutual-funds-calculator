const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./router')
const PORT = 3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(router())
app.use('/', express.static('../client/build'))
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log(`Please open your browser and open the url "http://localhost:${PORT}"`)
})
