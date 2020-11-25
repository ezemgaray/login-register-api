# Login - Register API

Login/Register workflow. This is part of a MERN stack project where the front end was built with React, Redux and back end with Mongo, Node and Express.

The front end is in the repo: [login-register-react](https://github.com/ezemgaray/login-register-react).

## Table of Contents

- [The project](#the-project)
  - [Endpoints](#endpoints)
  - [Built with](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Instalation](#instalation)
- [Development](#development)
  - [Response Structure](#response-structure)
  - [User Model](#user-model)


## The project

This is a simple API to serve the login/register workflow. 
The data is stored in MongoDB using Mongoose, Bcrypt to encrypt the password and Json Web Token for the Authorization Header

## Endpoints
This project only have three(3) endpoints:

- `/login`
- `/register`
- `/whoami`

## Built with

- [Node js](https://nodejs.org)
- [Express js](https://expressjs.com)
- [Mongoose js](https://mongoosejs.com)
- [MongoDB](https://mongodb.com)
- [Json Web Token](https://jwt.io)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)


## Getting Started
[&#8593; Guide](#table-of-contents)

### Prerequisites
This project requires the following to run 

- [Node js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [login-register-react](https://github.com/ezemgaray/login-register-react)


### Instalation
[&#8593; Guide](#table-of-contents)

- Clone repos
  - `git clone https://github.com/ezemgaray/login-register-react.git`
  - `git clone https://github.com/ezemgaray/login-register-api`
- Install NPM packages
  - `npm install`
- Set environment variables. see '.env.examples'

```
NODE_ENV=development

PORT=4000
CLIENT_URL_DEV=http://localhost:3000
SECRET_DEV=mysecret
SALT_ROUNDS_DEV=number
DB_URL_DEV=addMongoUrl

CLIENT_URL_PROD=http://localhost:3000
SECRET_PROD=mysecretprod
SALT_ROUNDS_PROD=number
DB_URL_PROD=addMongoUrl

CLIENT_URL_TEST=http://localhost:3000
SECRET_TEST=mysecrettest
SALT_ROUNDS_TEST=number
DB_URL_TEST=dbormock
```
- Run
  - `npm start`


## Development
[&#8593; Guide](#table-of-contents)

### Response structure

this is the response structure where the

```javascript
response = {
  data: {...any} or null,
  error: {...any} or null
}

// Mongooose validation error message

error: {
  message: 'Name is required',
  type: 'required',
  path: 'name',
  value: null
}
```

### User Model  
[&#8593; Guide](#table-of-contents)


path: `src/database/Models/User.model.js`

***User Model using Mongoose Schema:***

```javascript
const UserSchema = Schema({
  email: {
    type: String,
    ...
    }
  },
  name: {
    type: String,
    ...
  },
  password: {
    trim: String,
    ...
  }
},{
  timestamps: true
})
```

***Mongoose validation***
To validate the data, mongoose validation is used and combined with the following dependencies: `emailValidator` and `mongoose-beautiful-unique-validation`

```javascript
const UserSchema = Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // Unique validation return this message on error where 'VALUE' is de input data
    unique: '"{VALUE}" is already registered!', 
    required: [true, 'Email is required'],
    // emailValidator checks the email format and return the message if it is incorrect.
    validate: {
      validator: emailValidator.validate,
      message: props => `"${props.value}" is not a valid email.`
    }
  },
  ...
})

```

***Password Encryption***

To encrypt password `User.model` implements `Bcrypt` in static methods. That way it can be used with a `pre save` middleware. Before the data is saved the password is encrypted.

```javascript
/**
 * User pre middleware
 */
UserSchema.pre(
  'save', 
  async function(next) {

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
```

## Authors

- [Ezequiel Garay](https://github.com/ezemgaray)  
[![LinkedIn][linkedin-shield]][linkedin-url]


[linkedin-shield]: https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue
[linkedin-url]: https://linkedin.com/in/ezequiel-garay
