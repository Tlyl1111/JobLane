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

class AuthController {
    // [GET] /news
    async signin(req, res) {
        // Lấy dữ liệu từ các trường nhập vào của form login
        const { Email, Password } = req.body;

        try {
        // Tìm tài khoản dựa trên email
        const account = await Account.findOne({Email: Email}).exec();

        if (req.body.rememberMe) {
            const rememberToken = crypto.randomBytes(20).toString('hex');
            // Lưu token vào cơ sở dữ liệu và thiết lập cookie
            res.cookie('remember_me', rememberToken, { maxAge: 2592000000, httpOnly: true }); // 30 ngày
        }

        if (!account) {
            return res.status(401).send('Email không tồn tại.');
        }

        if (account) {
            // Lưu thông tin người dùng vào session hoặc một object toàn cục
            req.session.user = {
            ...account.toObject(),
            isJobseeker: account.Role === 'jobseeker',
            isEmployer: account.Role === 'employer'
            
          };

              // Loại bỏ mật khẩu khỏi session
            // Tiếp tục với việc chuyển hướng hoặc xử lý khác
          }
          

        /* if (Email != account) {
            return res.status(401).send('Email không tồn tại trong data');
        } */

        // So sánh mật khẩu nhập vào với mật khẩu đã băm trong database
        const passwordMatch = await bcrypt.compare(Password, account.Password);

        if (!passwordMatch) {
           return res.status(401).send(' Mật khẩu không chính xác. ');
        }

        /* if(Password != account.Password) {
            return res.status(401).send(' Mật khẩu không chính xác. ');
        } */


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
        };
        
        } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server.'); 
        }
    };
    
    async createNewAccount(role) {
        try {
          const newAccount = await Account.create({Role: role });
          
           // Sử dụng phương thức create
          return newAccount;
        } catch (error) {
          throw error; // Ném lỗi để có thể xử lý ở cấp cao hơn
        }
      };

    async setRole(req, res) {
        /* try {
          const { role } = req.body;
          const newAccount = await AccountModel.create({ role }); // Giả định AccountModel đã có phương thức create
          req.session.accountId = newAccount._id; // Lưu ID vào session
          res.redirect('/signup_2'); // Chuyển hướng người dùng
        } catch (error) {
          res.status(500).send('Internal Server Error');
        } */
        try {
            const { role } = req.body;
            req.session.role = role;

            /* const newAccount = await this.createNewAccount(role);
            
            req.session.accountId = newAccount._id; // Lưu ID vào session
            const newUser = await User.create({accId: req.session.accountId });
            req.session.userId = newUser._id;*/
            res.redirect('/signup_2'); // Chuyển hướng người dùng
            // Tiếp tục với logic của bạn 
          } catch (error) {
            console.error('Error creating new account:', error);
            res.status(500).send('Internal Server Error');
          }
    };

    async updateAccount(req, res) {
        try {
          /* const accountId = req.session.accountId; // Lấy ID từ session
          const userId = req.session.userId; */
          const Password= req.body.Password;
          const hashedPassword = await bcrypt.hash(Password, saltRounds);
          const CPassword= req.body.CPassword;
          const check = req.body.check;

          const checkEmail = await Account.findOne({Email: req.body.Email});

          if(checkEmail) {
            res.status(400).send('Email đã tồn tại');
          }

          if(Password === '') 
          {
            res.status(400).send('Mật khẩu không trùng khớp');
          }
          
          if(Password != CPassword) 
          {
            res.status(400).send('Mật khẩu không trùng khớp');
          }
          
          if(check == 'on') {
            const role =  req.session.role;
            const newAccount = await this.createNewAccount(role);
              
            req.session.accountId = newAccount._id; // Lưu ID vào session
            const newUser = await User.create({accId: req.session.accountId });
            req.session.userId = newUser._id;

            const accountId = req.session.accountId; // Lấy ID từ session
            const userId = req.session.userId;
            

            await Account.findByIdAndUpdate(accountId, { $set:
              { Email: req.body.Email,
            Password: hashedPassword } },{ new: true, useFindAndModify: false }).exec();

            await User.findByIdAndUpdate(userId, { $set: { Name: req.body.Name} },{ new: true, useFindAndModify: false }).exec();
            req.session.userName = req.body.Name;
            const account = await Account.findById(accountId).exec();

            if (account.Role === 'jobseeker') {

            res.status(500).redirect('/jobseeker/profile?firstName=' + encodeURIComponent(req.session.userName)); // Chuyển hướng đến trang thành công hoặc tiếp theo
            }else{
            res.status(500).redirect('/employer/employer_details?firstName=' + encodeURIComponent(req.session.userName));
            }
            
          }else{
            res.status(400).send('Vui lòng xác nhận!');
          }
          

          
        } catch (error) {
          console.error('Error updating account:', error);
          // Không chuyển hướng, có thể hiển thị thông báo lỗi
          res.render('signup_2', { error: 'Có lỗi xảy ra trong quá trình cập nhật tài khoản.' });

        }
      }

    async renderSignupPage2(req, res) {
        // Phương thức này có thể sử dụng để render trang signup_2
        res.render('signup_2', { accountId: req.session.accountId });
    };
    
}

module.exports = new AuthController();
