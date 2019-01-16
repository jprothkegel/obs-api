const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const MetadataController = require('../controllers/metadata');

router.post('/', checkAuth, MetadataController.set_metadata);
router.get('/', MetadataController.get_metadata);
router.put('/', MetadataController.set_empty_metadata);

module.exports = router;