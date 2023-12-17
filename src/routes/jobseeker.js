const express = require('express');
const router = express.Router();

const jobseekerController = require('../app/controllers/JobseekerController');

//newsController.index

router.use('/dashboard', jobseekerController.dashboard);
router.use('/profile', jobseekerController.profile);
router.use('/applied_list', jobseekerController.applied_job_list);
router.use('/favorite_job', jobseekerController.bookmarked_job_list);

module.exports = router;
