const express = require('express');
const router = express.Router();

const jobseekerController = require('../app/controllers/JobseekerController');
const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });
//newsController.index

router.use('/dashboard', jobseekerController.dashboard);
router.use('/profile', jobseekerController.profile);
router.use('/applied_list', jobseekerController.applied_job_list);
router.use('/favorite_job', jobseekerController.bookmarked_job_list);

router.use('/job_posting_detail', jobseekerController.job_posting_detail);
router.post('/your_profile', jobseekerController.your_profile.bind(jobseekerController));
router.use('/apply_cv', jobseekerController.apply_CV);
router.post('/loading_cv', upload.single('file'), jobseekerController.loading_apply);

module.exports = router;
