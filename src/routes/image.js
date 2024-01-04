const express = require('express');
const router = express.Router();
const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });

const imageController = require('../app/controllers/ImageController');


router.use('/upload', imageController.upload);
router.get('/show', imageController.show);
router.post('/uploadfile', upload.single('file'), imageController.uploadfile);
router.get('/file', imageController.showfile);

module.exports = router;
