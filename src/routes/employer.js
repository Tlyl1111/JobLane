const express = require('express');
const router = express.Router();

const employerController = require('../app/controllers/EmployerController');

//newsController.index

router.use('/dashboard', employerController.dashboard);

module.exports = router;
