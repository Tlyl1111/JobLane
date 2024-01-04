
const express = require('express');
const router = express.Router();

const JobController = require('../app/controllers/JobController');

router.use('/alljob', JobController.alljob);
router.use('/categories', JobController.categories);


module.exports = router;
