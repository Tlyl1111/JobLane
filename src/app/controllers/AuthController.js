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
    async admin(req, res) {
        // Lấy dữ liệu từ các trường nhập vào của form login
        const { Email, Password } = req.body;

        try {
        // Tìm tài khoản dựa trên email
        const account = await Account.findOne({Email: Email}).exec();
    
        if (!account) {
            return res.status(401).send('Email không tồn tại.');
        }

        /* if (Email != account) {
            return res.status(401).send('Email không tồn tại trong data');
        } */

        // So sánh mật khẩu nhập vào với mật khẩu đã băm trong database
        /* const passwordMatch = await bcrypt.compare(Password, account.Password);

        if (!passwordMatch) {
            return res.status(401).send(Password +' Mật khẩu không chính xác. '+ account.Password);
        } */

        if(Password != account.Password) {
            return res.status(401).send(' Mật khẩu không chính xác. ');
        }


        // Kiểm tra vai trò của tài khoản và tạo token nếu cần
        if (account.Role === 'admin') {
            // Đảm bảo JWT_SECRET được cấu hình và có giá trị
            const JWT_SECRET_admin = process.env.JWT_SECRET_admin || 'your_default_secret';
            
            // Tạo JWT để xác thực phiên làm việc của admin
            const token_admin = jwt.sign(
                { id: account._id, role: account.Role },
                JWT_SECRET_admin,
                { expiresIn: '1h' }
            );
            
            // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
            res.cookie('token', token_admin, { httpOnly: true });

            // Chuyển hướng người dùng đến trang quản trị
            return res.redirect('/admin/dashboard');
        } else {
            if (account.Role === 'employer') {
                // Đảm bảo JWT_SECRET được cấu hình và có giá trị
                const JWT_SECRET_employer = process.env.JWT_SECRET_employer || 'your_default_secret';
                
                // Tạo JWT để xác thực phiên làm việc của admin
                const token_employer = jwt.sign(
                    { id: account._id, role: account.Role },
                    JWT_SECRET_employer,
                    { expiresIn: '1h' }
                );
                
                // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
                res.cookie('token', token_employer, { httpOnly: true });
    
                // Chuyển hướng người dùng đến trang quản trị
                return res.redirect('/employer/dashboard');
            } else {
                if (account.Role === 'jobseeker') {
                    // Đảm bảo JWT_SECRET được cấu hình và có giá trị
                    const JWT_SECRET_jobseeker = process.env.JWT_SECRET_jobseeker || 'your_default_secret';
                    
                    // Tạo JWT để xác thực phiên làm việc của admin
                    const token_jobseeker = jwt.sign(
                        { id: account._id, role: account.Role },
                        JWT_SECRET_jobseeker,
                        { expiresIn: '1h' }
                    );
                    
                    // Lưu trữ token trong cookie hoặc gửi trực tiếp trong phản hồi
                    res.cookie('token', token_jobseeker, { httpOnly: true });
        
                    // Chuyển hướng người dùng đến trang quản trị
                    return res.redirect('/jobseeker/dashboard');
                } else {
                    return res.status(403).send('Không có quyền truy cập.');
                }
            }
        }
        } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server.'); 
        }
    }

    
}

module.exports = new AuthController();
