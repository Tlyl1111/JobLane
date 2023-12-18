const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.use('/theliem', siteController.theliem);
router.use('/signup', siteController.signup);
//add site ở trên dòng này
router.use('/', siteController.signin);

module.exports = router;
