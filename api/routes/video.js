const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const videoController = require('../controllers/video')

router.post('/create', videoController.video_create)
router.get('/all', videoController.video_get_all)
router.get('/:videoId', videoController.video_get)
router.post('/delete', videoController.video_delete)

module.exports = router