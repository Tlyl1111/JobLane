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


    
    async calculateTimeRemaining(endDate) {
        const now = new Date();
        const end = new Date(endDate);
        const timeRemaining = end - now;
      
        if (timeRemaining > 0) {
          // Chuyển đổi thời gian từ milliseconds sang ngày
          const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          return daysRemaining;
        } else {
          // Nếu công việc đã kết thúc, trả về 0
          return 0;
        }
      }
      
      // Hàm async để lấy tất cả công việc và tính thời gian còn lại
    async calculateJobs(req, res) {
        try {
          
          const jobs = await Job.find({}).exec(); // Đợi cho đến khi lấy được tất cả công việc
          
          const jobsWithTimeRemaining = await Promise.all(jobs.map(async (job) => {
            const daysRemaining = await this.calculateTimeRemaining(job.EndDay);
            // Return a new object with all original job fields and the added daysRemaining
            return { ...job.toObject(), daysRemaining };
          }));
          
          // Send the enhanced jobs array as a response
          res.json(jobsWithTimeRemaining);
          
        } catch (err) {
          console.error(err);
        }
    }
      
    
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
        res.render('employer/applicant_list'); // Explicitly set the layout
        //res.render('noti/failure', { layout: 'pop_up' });
    }
    
    

    
}

module.exports = new SiteController();
