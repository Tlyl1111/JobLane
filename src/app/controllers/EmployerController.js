const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ImgPosting = require('../models/ImgPosting');

const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });
//newsController.index

class EmployerController {
    
    
    async dashboard(req, res) {
        res.render('dashboard');
    }
    
    async job_posting(req, res) {
        res.render('employer/post_job');
    }
    async posted_jobs(req, res) {      
        res.render('employer/post_list');
    }
    async profile(req, res) {
        const firstName = req.query.firstName;
        res.render('employer/employer_details',{ firstName });
    }
    async applicants(req, res) {
        res.render('employer/applicant_list');
    }

    async loading_profile(req, res) {
        console.log(req.body);
    }

    async posting(req,res) {
        try {
            console.log(req.body);
            const userId = req.session.userId;
            const newFile = new ImgPosting({
                name: req.file.originalname,
                data: req.file.buffer,
                contentType: req.file.mimetype
              });

              
            await newFile.save();

            const newjobdetail = await JobDetail.create({
                Type: req.body.JobType,
                Specialization: req.body.Specialization,
                CompanyType: req.body.CompanyType,
                Location: req.body.Location,
                Experience: req.body.Experience,
                Salary: req.body.Salary,
                Description: req.body.Description,
                Requirement: req.body.Goal,
                HiringProcess: req.body.HiringProcess,
                HowtoApply: req.body.Howtoapply,
                Category1ID: req.body.Category1ID,
                Category2ID: req.body.Category2ID,
                Category3ID: req.body.Category3ID,
            });      
            const newjob = await Job.create({
                Title: req.body.JobTitle,
                PostDay: req.body.StartDate,
                EndDay: req.body.EndDate,
                Status: 'assessing',
                JobDetailID: newjobdetail._id,
                ImagPosstingID: ImgPosting._id,
                UserID: userId,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
    
}

module.exports = new EmployerController();
