const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

//newsController.index

router.use('/dashboard', adminController.dashboard);
router.use('/employer_details', adminController.employer_details);
router.use('/employer', adminController.employer);
router.use('/job_post_detail', adminController.job_post_detail);
router.use('/job_post', adminController.job_post);
router.use('/job_seeker', adminController.job_seeker);
router.use('/jobseeker_details', adminController.jobseeker_details);



module.exports = router;
