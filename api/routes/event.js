const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const eventController = require('../controllers/event')

router.post('/create', checkAuth, eventController.event_create)
router.post('/', checkAuth, eventController.event_get_all_user)
router.post('/delete', checkAuth, eventController.event_delete)
router.post('/location', eventController.event_get_all_location)
router.get('/location/:eventId', eventController.event_get_by_id)

module.exports = router