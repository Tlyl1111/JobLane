const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');



router.post('/auth', authController.admin);

module.exports = router;
