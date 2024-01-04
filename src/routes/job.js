
const express = require('express');
const router = express.Router();

const JobController = require('../app/controllers/JobController');



router.post('/job', JobController.dashboard);


module.exports = router;
