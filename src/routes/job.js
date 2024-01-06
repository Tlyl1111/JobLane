
const express = require('express');
const router = express.Router();

const JobController = require('../app/controllers/JobController');

router.use('/alljob', JobController.alljob);
router.use('/categories', JobController.categories);
// Job details route
router.use('/details/:id', (req, res, next) => {
    console.log('Job details route handler called');
    next();
}, JobController.jobDetails);

// Jobs by category route
router.use('/category/:category', (req, res, next) => {
    console.log('Jobs by category route handler called');
    next();
}, JobController.jobsByCategory);

module.exports = router;
