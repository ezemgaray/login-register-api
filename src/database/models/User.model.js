const { Schema, model } = require('mongoose')
const emailValidator    = require("email-validator")
const beautifyUnique    = require("mongoose-beautiful-unique-validation")
const bcrypt            = require('bcrypt')

const UserSchema = Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: '"{VALUE}" is already registered!',
    required: [true, 'Email is required'],
    validate: {
      validator: emailValidator.validate,
      message: props => `"${props.value}" is not a valid email.`
    }
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must have more than two characters']
  },
  password: {
    trim: true,
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must have six(6) or more characters']
  }
},{
  timestamps: true
})

/**
 * User Hooks pre
 */
UserSchema.pre(
  'save', 
  async (next) => {

  const User = model('User')

  if(this.isModified('password')){
    this.password = await User.hashPassword(this.password)
  }

  next()
})

// Implement unique data verification
UserSchema.plugin(beautifyUnique)

/**
 * Static Methods
 */
UserSchema.statics = {

  /**
   * Encrypt password
   * @return String passwordHashed
   */
  hashPassword: async password =>{
    if(password){
      const passwordHashed = await bcrypt.hash(password, 10)
      return passwordHashed
    }
  },

  /**
   * Compare password
   * @return Boolean result
   */
  verifyPassword: async (password, hash) =>{
    if(password && hash){
      const result = await bcrypt.compare(password, hash)
      return result
    }
  },

  /**
   * Return error message after validation.
   */
  getError: ({errors}) => Object.values(errors)[0].properties
}

module.exports = model('User', UserSchema)