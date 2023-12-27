const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class SiteController {
    // [GET] /
    async find(req, res) {
        
        try {
            /* const role = 'jobseeker';
            const account = await Account.find({Role: role}); */

            const role = 'jobseeker4@gmail.com';

            const checkEmail = await Account.findOne({Email: role});
            res.json(checkEmail);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
        
        //res.render('home');
    }
    /* async home(req, res) {
        res.render('home');
    } */
    
    async signin(req, res) {
        res.render('signin');
    }

    async signup(req, res) {
        res.render('signup_1');
    }

    //cần navigate trang nào thì đổi 'home' thành file đó nhé
    //note: nếu có trong thư mục các role thì dẫn luôn thư mục 
    //ví dụ: file admin_dashboard trong thư mục admin thì đổi 'home' thành 'admin/admin_dashboard'
    //truy cập tới localhost:3101/theliem sẽ truy cập đc
    async theliem(req, res) {
        //res.render('forget_pass'); // Explicitly set the layout
        res.render('noti/failure', { layout: 'pop_up' });
    }
    
    

    
}

module.exports = new SiteController();
