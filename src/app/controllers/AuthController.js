const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    // [GET] /news
    async index(req, res) {
        res.render('signin');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }
    
}

module.exports = new AuthController();
