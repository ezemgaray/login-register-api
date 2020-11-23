require('../database/connection/connection')
const User    = require('../database/models/User.model')
const jwt     = require('jsonwebtoken')
const config  = require('../config/config')

/**
 * Create User.
 */
exports.create = async (req, res) => {
  const user = new User(req.body)

  await user.save()
    .then( user => {
      return res.status(200).json({
        data: `User ${user.email} was successfully registered`, 
        error: null
      })
    })
    .catch(errors => {
      let error = User.getError(errors)
      return res.status(400).json({
        data: null, 
        error: error
      })
    })
}

/**
 * Login
 */
exports.login = async (req, res) => {
  let error = null

  // Validate inputs. Set a valid fakeName to ignore this field.
  // If all is ok, errors = null
  const errors = await (new User({...req.body, name: "fakeName"}))
    .validate()
    .catch( err => err)
    || null

  if (errors) {
    error = await User.getError(errors)
    return res.status(400).json({
      data: null,
      error: error
    })
  }

  // Find user by Email and return error if it doesn't exist
  const user =  await User.findOne({email: req.body.email})
  if(!user){
    error = {
      message: 'User not found. Create an account!',
      type: 'not found',
      path: 'email',
      value: req.body.email
    }
    return res.status(400).json({
      data: null, 
      error: error
    })
  }

  // Return error if the password doesn't match
  if(!(await User.verifyPassword(req.body.password, user.password))){
    error = {
      message: 'Incorrect Password.',
      type: 'bad credentials',
      path: 'password',
      value: ''
    }
    return res.status(400).json({
      data: null, 
      error: error
    })
  }

  // Create access token
  const accessToken = jwt.sign(userLogedIn, config.secret)
  // Prepare data object to send response
  const data = {
    token: accessToken,
    user: {
      _id: `${user._id}`,
      email: user.email,
      name: user.name
    }
  }
  // Response
  res.status(200).json({
    data: data,
    error: error // error=null
  })
}
