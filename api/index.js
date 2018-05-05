const express = require('express')
const router = express.Router()

module.exports = router

router.use('/auth', require('./auth'))
router.use('/teacher', require('./teacher'))
router.use('/student', require('./student'))
router.use('/classroom', require('./classroom'))
router.use('/subject', require('./subject'))
router.use('/mark', require('./mark'))
