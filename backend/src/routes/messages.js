const express = require('express')
const router = express.Router()
const groups = require('../controllers/groups.js')
const messages = require('../controllers/messages.js')

router.use('/api/messages/:gid', groups.checkGroup, messages.checkMember)

router.get('/api/messages/:gid', messages.getMessages)
router.post('/api/messages/:gid', messages.sendMessage)

module.exports = router
