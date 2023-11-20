const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

//newsController.index
router.use('/:slug', authController.show);
router.use('/', authController.index);

module.exports = router;
