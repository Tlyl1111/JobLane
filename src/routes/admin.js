const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

//newsController.index

router.use('/dashboard', adminController.dashboard);

module.exports = router;
