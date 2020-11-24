const jwt    = require('jsonwebtoken')
const config = require('../config/config.js')


module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res
      .status(401)
      .json({
        data: null,
        error: {
          message: 'Unauthorized: Missing JWT'
        }
      })
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({
          data: null,
          error: {
            message: 'Forbidden: Invalid JWT'
          }
        })
    }

    req.user = user
    next()
  })
}