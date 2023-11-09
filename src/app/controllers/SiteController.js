const Account = require('../models/Account');

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
            const account = await Account.find({});
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
    
}

module.exports = new SiteController();
