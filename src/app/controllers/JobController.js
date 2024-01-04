const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class JobController {
    
    async categories(req, res) {
        res.render('categories');
    }

    async alljob(req, res) {
        res.render('search_result');
    };

    
}

module.exports = new JobController();
