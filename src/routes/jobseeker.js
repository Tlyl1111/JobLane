const express = require('express');
const router = express.Router();

const jobseekerController = require('../app/controllers/JobseekerController');

//newsController.index

router.use('/dashboard', jobseekerController.dashboard);

module.exports = router;
