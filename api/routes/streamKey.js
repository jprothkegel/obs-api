const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const streamKeyController = require('../controllers/streamKey');

router.post('/generate', checkAuth, streamKeyController.streamKey_generate);
router.get('/:userId', checkAuth, streamKeyController.get_streamkey);
module.exports = router;