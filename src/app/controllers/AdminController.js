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
      try {
        /* // Lấy userID từ parameter URL
        const userId = req.params.id;

        // Tìm thông tin chi tiết người dùng dựa trên userID
        const userDetails = await User.findById(userId); */

        // Render trang employer_details với thông tin chi tiết của người dùng
        res.render('admin/employer_details', { layout: 'admin'});
      } catch (error) {
          res.status(500).send('Error while getting employer details: ' + error.message);
      }
    }

    async employer(req, res) {
        /* try {
            const role = 'employer';
            const account = await Account.find({Role: role}).populate('userId');
            //const employers = await Account.find({ Role: 'employer' }).populate('userId');
            console.log(account);
            res.render('admin/employer', { layout: 'admin', account });
             // 'employer' should be the name of your .hbs file
          } catch (error) {
            console.error(error);
            res.status(500).send('Error while getting employers: ' + error.message);
          } */
        
          /* try {
            // Truy vấn để lấy tất cả các accounts có Role là 'employer'
            const employerAccounts = await Account.find({ Role: 'employer' });
            // Truy vấn để lấy thông tin người dùng từ User model dựa trên userIds
            const userIds = employerAccounts.map(acc => acc.userId);
            const userInformation = await User.find({ '_id': { $in: userIds } });
        
            // Bạn có thể muốn biến userInformation thành một object để dễ dàng truy cập
            const userMap = {};
            userInformation.forEach(user => {
              userMap[user._id] = user;
            });
        
            // Thêm thông tin người dùng vào accounts
            const accountsWithUserInfo = employerAccounts.map(acc => {
              return {
                ...acc._doc,
                userInfo: userMap[acc.userId]
              };
            });
            console.log(accountsWithUserInfo);
            res.render('admin/employer', { layout: 'admin', employers: accountsWithUserInfo });
          } catch (error) {
            console.error('Error while getting employers: ', error);
            res.status(500).send('Error while getting employers: ' + error.message);
          } */

         
            try {
              const employerAccounts = await Account.find({ Role: 'employer' });
              console.log(employerAccounts);
              //const userIds = await User.find({ '_id': { $in: employerAccounts.userID } });
              const userIds = employerAccounts.map(account => account.userID);
              const userDetails = await User.find({ '_id': { $in: userIds }});

              console.log(userIds);
             // const userDetails = await User.find({ '_id': { $in: userIds } });
              console.log(userDetails);
              // Tạo một map từ user ID đến thông tin người dùng
              const userMap = userDetails.reduce((map, user) => {
                map[user._id] = {
                    Name: user.Name, // Đảm bảo trường này trùng khớp với trường trong DB
                    Phone: user.Phone // Đảm bảo trường này trùng khớp với trường trong DB
                };
                return map;
              }, {});
          
              // Thêm thông tin người dùng vào mỗi account
              const employers = employerAccounts.map(account => {
                return {
                  email: account.Email,
                  role: account.Role,
                  userInfo: userMap[account.userID]
                };
              });
              
          
              res.render('admin/employer', { layout: 'admin', employers });
            } catch (error) {
              console.error('Error while getting employers:', error);
              res.status(500).send('Error while getting employers: ' + error.message);
            }
          
          
    }

    async job_post_detail(req, res) {
        res.render('admin/job_post_detail',{ layout: 'admin' });
    }

    async job_post(req, res) {
      
    
    }

    async job_seeker(req, res) {
      try {
        const employerAccounts = await Account.find({ Role: 'jobseeker' });
        console.log(employerAccounts);
        //const userIds = await User.find({ '_id': { $in: employerAccounts.userID } });
        const userIds = employerAccounts.map(account => account.userID);
        const userDetails = await User.find({ '_id': { $in: userIds }});

        console.log(userIds);
       // const userDetails = await User.find({ '_id': { $in: userIds } });
        console.log(userDetails);
        // Tạo một map từ user ID đến thông tin người dùng
        const userMap = userDetails.reduce((map, user) => {
          map[user._id] = {
              Name: user.Name, // Đảm bảo trường này trùng khớp với trường trong DB
              Phone: user.Phone // Đảm bảo trường này trùng khớp với trường trong DB
          };
          return map;
        }, {});
    
        // Thêm thông tin người dùng vào mỗi account
        const employers = employerAccounts.map(account => {
          return {
            email: account.Email,
            role: account.Role,
            userInfo: userMap[account.userID]
          };
        });
        
    
        res.render('admin/job_seeker', { layout: 'admin', employers });
      } catch (error) {
        console.error('Error while getting jobseeker:', error);
        res.status(500).send('Error while getting jobseeker: ' + error.message);
      }
    }

    async jobseeker_details(req, res) {
        res.render('admin/jobseeker_details',{ layout: 'admin' });
    }

    async show_employer(req,res) {

        const account = await Account.find({Role: employer});
        

    }
    
}

module.exports = new AdminController();
