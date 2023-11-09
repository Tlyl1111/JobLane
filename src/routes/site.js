const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//newsController.index
router.use('/home', siteController.home);
//add site ở trên dòng này
router.use('/', siteController.index);

module.exports = router;
