const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')

router.use('/api', user.verifieTokenPresent)
router.use('/api/users/:id', user.verifieAdmin)

router.get('/api/users', user.getUsers)
router.post('/register', user.newUser)
router.put('/api/users/:id', user.updateUser)
router.put('/api/password', user.updatePassword)
router.delete('/api/users/:id', user.deleteUser)
router.post('/login', user.login)

module.exports = router
