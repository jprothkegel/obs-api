const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const eventController = require('../controllers/event')

router.post('/create', eventController.event_create)
router.get('/', eventController.event_get_all_user)
router.delete('/', eventController.event_delete)

module.exports = router