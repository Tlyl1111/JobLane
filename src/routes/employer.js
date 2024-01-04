const express = require('express');
const router = express.Router();

const employerController = require('../app/controllers/EmployerController');
const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });
//newsController.index

//newsController.index

router.use('/dashboard', employerController.dashboard);
router.use('/post_list', employerController.posted_jobs);
router.use('/post_job', employerController.job_posting);
router.use('/employer_details', employerController.profile); // equal to employer_details file name
router.use('/applicant_list', employerController.applicants); // equal to list_applicant file name
router.post('/loading_profile', employerController.loading_profile);
router.post('/posting', upload.single('PostImage'), employerController.posting);

module.exports = router;
