const router = require('express').Router()
router.use(require('./user'))
router.use(require('./groups'))
module.exports = router
