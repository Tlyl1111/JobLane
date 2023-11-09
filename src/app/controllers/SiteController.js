const Applicant = require('../models/Account');

class SiteController {
    // [GET] /
    async index(req, res) {
        try {
            const account = await Account.find({});
            res.json(account);
        } catch (err) {
            console.error(err); // Ghi log lỗi
            res.status(400).json({error: 'ERROR!!!'});
        }
        //res.render('home');
    }
    
}

module.exports = new SiteController();
