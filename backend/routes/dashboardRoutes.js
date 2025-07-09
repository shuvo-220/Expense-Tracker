const express = require('express');
const{protect} = require('../middleware/authMiddleware');
const { dashboard } = require('../controllers/dashboard');

const router = express.Router();

router.get('/', protect, dashboard)

module.exports = router;