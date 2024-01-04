const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminController {
    
    
    async dashboard(req, res) {
        res.render('admin/dash_board',{ layout: 'admin' });
    }

    async employer_details(req, res) {
        res.render('admin/employer_details',{ layout: 'admin' });
    }

    async employer(req, res) {
        res.render('admin/employer',{ layout: 'admin' });
    }

    async job_post_detail(req, res) {
        res.render('admin/job_post_detail',{ layout: 'admin' });
    }

    async job_post(req, res) {
        res.render('admin/job_post',{ layout: 'admin' });
    }

    async job_seeker(req, res) {
        res.render('admin/job_seeker',{ layout: 'admin' });
    }

    async jobseeker_details(req, res) {
        res.render('admin/jobseeker_details',{ layout: 'admin' });
    }

    async show_employer(req,res) {

        const account = await Account.find({Role: employer});
        

    }
    
}

module.exports = new AdminController();
