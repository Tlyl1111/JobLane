
const express = require('express');
const router = express.Router();

const JobController = require('../app/controllers/JobController');

router.use('/alljob', JobController.alljob);
router.use('/categories', JobController.categories);
router.use('/jobs/category/:category', JobController.jobsByCategory); 
router.use('/jobs/:id', JobController.jobDetails);

module.exports = router;
