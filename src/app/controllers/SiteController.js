const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            const role = 'employer1@gmail.com';
            const account = await Account.findOne({Email: role});
            res.json(account);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
        
        //res.render('home');
    }
    async home(req, res) {
        res.render('home');
    }
    async admin(req, res) {
            // Lấy dữ liệu từ các trường nhập vào của form login
        const { Email, Password } = req.body;

        try {
        // Tìm tài khoản dựa trên email
        const account = await Account.findOne({Email: Email}).exec();
      
        if (!account) {
            return res.status(401).send('Email không tồn tại.');
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã băm trong database
        /* const passwordMatch = await bcrypt.compare(Password, account.Password);

        if (!passwordMatch) {
            return res.status(401).send(Password +' Mật khẩu không chính xác. '+ account.Password);
        } */

        if(Password != account.Password) {
            return res.status(401).send(Password +' Mật khẩu không chính xác. '+ account.Password);
        }


        // Kiểm tra vai trò của tài khoản và tạo token nếu cần
        if (account.Role === 'admin') {
            // Tạo JWT để xác thực phiên làm việc của admin
            const token = jwt.sign(
            { id: account._id, role: account.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
            );
            
            // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
            res.cookie('token', token, { httpOnly: true });

            // Chuyển hướng người dùng đến trang quản trị
            res.redirect('/home');
        } else {
            res.status(403).send('Không có quyền truy cập.');
        }
        } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server.'); 
        }
    }
    
}

module.exports = new SiteController();
