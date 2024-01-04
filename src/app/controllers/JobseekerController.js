const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const CV = require('../models/CV');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Điều chỉnh số lượng vòng băm theo nhu cầu bảo mật của bạn
const multer = require('multer');
const JobSeeker = require('../models/JobSeeker');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });

class JobseekerController {
    
    
    async dashboard(req, res) {
        res.render('dashboard');
        
    }
    async profile(req, res) {
        const firstName = req.query.firstName;
        res.render('jobseeker/jobseeker_details',{ firstName });
    }
    async applied_job_list(req, res) {
        res.render('jobseeker/applied_list');
    }
    async bookmarked_job_list(req, res) {
        res.render('jobseeker/favorite_job');
    }
    async job_posting_detail(req, res) {
        res.render('job_posting_detail');
    }
    async apply_CV(req, res) {
        res.render('apply_cv');
    }

    async loading_apply(req, res) {
        
        try {

            const {FullName, Email, PhoneNumber, cv_lt} = req.body;

            const newFile = new CV({
              name: req.file.originalname,
              data: req.file.buffer,
              contentType: req.file.mimetype
            });
            await newFile.save();
            
            const newapplication = await Application.create({
                CoverLetter: cv_lt,
                CVId: newFile._id,
            });
            res.send({ message: 'File uploaded successfully', fileId: newFile._id });
          } catch (error) {
            res.status(500).send(error.message);
          }
    };


    async your_profile(req,res) {
        try {
            const userId = req.session.userId;
        /* const user = await User.findById(userId).exec();
        console.log(user); */
        /* res.json(user); */
        console.log(req.body);
        const name = req.body.firstName + req.body.lastName ;
        /* await User.findByIdAndUpdate(userId, { $set: 
            { Name: name, 
                Phone: req.body.phone, 
                Email: req.body.email} },{ new: true, useFindAndModify: false }).exec();
        
        const newjobseeker = await JobSeeker.create({
            DoB: req.body.Birthday,
            Address: req.body.address,
            Bio: req.body.Biography,
            userId: userId,
        }); */

        res.status(500).redirect('/');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new JobseekerController();
