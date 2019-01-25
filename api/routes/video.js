const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const videoController = require('../controllers/video')

router.post('/create', checkAuth, videoController.video_create)
router.get('/all', videoController.video_get_all)
router.get('/:videoId', videoController.video_get)
router.post('/delete', checkAuth, videoController.video_delete)
router.post('/update', videoController.video_change_status)

module.exports = router