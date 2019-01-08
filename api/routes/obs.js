const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ObsController = require('../controllers/obs');

router.post('/connect', checkAuth, ObsController.obs_connect);
router.post('/startStream', checkAuth, ObsController.obs_start_streaming);
router.post('/stopStream', checkAuth, ObsController.obs_stop_streaming);
router.post('/startRecording', checkAuth, ObsController.obs_start_recording);
router.post('/stopRecording', checkAuth, ObsController.obs_stop_recording);
router.post('/startStreamRecording', checkAuth, ObsController.obs_start_streaming_recording);
router.post('/stopStreamRecording', checkAuth, ObsController.obs_stop_streaming_recording);
router.get('/getStreamStatus', checkAuth, ObsController.obs_get_streaming_status);
module.exports = router;