const express = require('express');
const router = express.Router();

router.use('/persons', require('./persons'));
router.use('/properties', require('./properties'))

module.exports = router;
