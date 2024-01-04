
const express = require('express');
const router = express.Router();

const JobController = require('../app/controllers/JobController');



router.post('/job', JobController.dashboard);
router.post('/posting', JobController.posting);

module.exports = router;
