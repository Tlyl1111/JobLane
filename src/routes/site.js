const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.use('/find', siteController.find);
router.use('/theliem', siteController.theliem);
router.use('/signup', siteController.signup);



router.use('/calculatejob', siteController.calculateJobs.bind(siteController));
//add site ở trên dòng này
router.use('/signin', siteController.signin);


module.exports = router;
