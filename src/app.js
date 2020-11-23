const express     = require('express')
const config      = require('./config/config.js')
const cors        = require('cors')
const authRouter  = require('./router/auth.routes')

// Create app
const app = express()

// Allow access only to slient domain
app.use(
  cors({
    origin: config.clientDomain
  })
)
app.use(express.json())

//Router
app.use('/', authRouter)

// Run server
app.listen(config.port)
