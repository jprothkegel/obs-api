const express = require('express')
const router = express.Router()

const OndemandController = require('../controllers/ondemand')

router.get('/', OndemandController.get_ondemand_videos)
router.post('/link', OndemandController.get_ondemand_link)

module.exports= router