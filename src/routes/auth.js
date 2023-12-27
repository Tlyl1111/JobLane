const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

// Trong file routes (ví dụ: routes.js)
router.post('/update-account', authController.updateAccount.bind(authController));
router.post('/set-role', authController.setRole.bind(authController));
router.get('/signup_2', authController.renderSignupPage2.bind(authController));
router.post('/auth', authController.signin);

module.exports = router;
