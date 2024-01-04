const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class EmployerController {
    
    
    async dashboard(req, res) {
        res.render('employer/dashboard');
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
}

module.exports = new EmployerController();
