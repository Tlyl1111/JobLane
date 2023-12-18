const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');



router.post('/auth', authController.signin);

module.exports = router;
