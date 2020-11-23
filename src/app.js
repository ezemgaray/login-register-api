const express     = require('express')
const config      = require('./config/config.js')
const cors        = require('cors')

const app = express()

// Allow access only to slient domain
app.use(
  cors({
    origin: config.clientDomain
  })
)

app.use(express.json())


app.listen(config.port)
