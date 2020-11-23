const {connection} = mongoose = require('mongoose')
const { mongoUrl } = require('../../config/config.js')

//Connect
mongoose.connect(mongoUrl, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
  useCreateIndex:     true
})
  .catch(err => console.log(err))

//Connection Events.
connection.on('error', error => {
  console.log(error)
  throw error;
})