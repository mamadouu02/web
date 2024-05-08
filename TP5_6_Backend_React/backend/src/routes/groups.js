const express = require('express')
const router = express.Router()
const groups = require('../controllers/groups.js')

router.use('/api/mygroups/:gid', groups.checkGroup, groups.checkGroupAccess)
router.use('/api/mygroups/:gid/:uid', groups.checkUser)

router.get('/api/mygroups', groups.getGroups)
router.post('/api/mygroups', groups.newGroup)
router.get('/api/mygroups/:gid', groups.getGroup)
router.delete('/api/mygroups/:gid', groups.checkOwnerAdmin, groups.deleteGroup)
router.put('/api/mygroups/:gid/:uid', groups.newMember)
router.delete('/api/mygroups/:gid/:uid', groups.deleteMember)
router.get('/api/groupsmember', groups.getGroupsMember)

module.exports = router
