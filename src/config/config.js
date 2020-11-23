const dotenv = require('dotenv');
dotenv.config()


const config = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 4000,
        secret: process.env.SECRET_DEV,
        clientDomain: process.env.CLIENT_URL_DEV,
        saltRounds: process.env.SALT_ROUNDS_DEV,
        mongoUrl: process.env.DB_URL_DEV
      }
    case 'production':
      return {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 4000,
        secret: process.env.SECRET_PROD,
        clientDomain: process.env.CLIENT_URL_PROD,
        saltRounds: process.env.SALT_ROUNDS_PROD,
        mongoUrl: process.env.DB_URL_PROD
      }
    case 'test':
      return {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 4000,
        secret: process.env.SECRET_TEST,
        clientDomain: process.env.CLIENT_URL_TEST,
        saltRounds: process.env.SALT_ROUNDS_TEST,
        mongoUrl: process.env.DB_URL_TEST
      }
  }
})()

module.exports = config