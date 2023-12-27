const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Điều chỉnh số lượng vòng băm theo nhu cầu bảo mật của bạn


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


    async your_profile(req,res) {
        const userId = req.session.userId;
        console.log(req.session.userId);
        /* const user = await User.findById(userId).exec();
        console.log(user); */
        /* res.json(user); */
        const Fname = req.body.firstName;
        const Lname = req.body.lastName;
        const email = req.body.email;
        const address = req.body.address;
        const phone = req.body.phone;
        const Dob = req.body.Birthday;
        const bio = req.body.Biography;

        const name = Fname + Lname;
        await User.findByIdAndUpdate(userId, { $set: { Name: name} },{ new: true, useFindAndModify: false }).exec();
        
        res.status(500).redirect('/');
    }
}

module.exports = new JobseekerController();
