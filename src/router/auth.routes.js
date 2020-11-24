const express         = require('express');
const authController  = require('../controllers/auth.controller')
const router          = express.Router()
const authMiddleware  = require('../middlewares/auth.middleware')

router.post('/register', authController.create)
router.post('/login', authController.login)
router.get('/whoami', authMiddleware, (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router