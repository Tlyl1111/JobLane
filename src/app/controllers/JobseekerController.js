const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class JobseekerController {
    
    
    async dashboard(req, res) {
        res.render('dashboard');
        
    }
    async profile(req, res) {
        res.render('jobseeker/jobseeker_details');
    }
    async applied_job_list(req, res) {
        res.render('jobseeker/applied_list');
    }
    async bookmarked_job_list(req, res) {
        res.render('jobseeker/favorite_job');
    }
}

module.exports = new JobseekerController();
