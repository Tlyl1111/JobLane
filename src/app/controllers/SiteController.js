const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');

class SiteController {
    // [GET] /
    async index(req, res) {
        /* try {
            // Tạo một instance mới của model Applicant với dữ liệu từ req.body
            const newUser = new Applicant(req.body);
      
            // Lưu người dùng vào cơ sở dữ liệu
            await newUser.save();
      
            // Gửi phản hồi thành công
            res.status(201).json({ message: 'New user added successfully', newUser });
          } catch (err) {
            // Nếu có lỗi, ghi log và gửi phản hồi lỗi
            console.error(err);
            res.status(400).json({ error: 'ERROR!!!', details: err.message });
          } */
        try {
            const user = await User.find({});
            res.json(user);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
        //res.render('home');
    }
    async home(req, res) {
        res.render('home');
    }
    
}

module.exports = new SiteController();
