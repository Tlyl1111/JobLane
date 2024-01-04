const Account = require('../models/Account');
const Application = require('../models/Application');
const Comment = require('../models/Comment');
const Company = require('../models/Company');
const Job = require('../models/Job');
const JobDetail = require('../models/JobDetail');
const User = require('../models/User');
const Image = require('../models/Image');

const multer = require('multer');
// Sử dụng memoryStorage để tệp được lưu trong bộ nhớ tạm thời
const upload = multer({ storage: multer.memoryStorage() });

class ImageController {
    
    async upload(req, res) {
        res.render('upload_img');
    }

    async show(req, res) {
        try {
            const images = await Image.find(); // Sử dụng model Image để lấy tất cả hình ảnh
            const imagesWithBase64 = images.map(doc => ({
              ...doc._doc,
              data: doc.data.toString('base64') // Chuyển đổi Buffer thành chuỗi base64
            }));
            res.render('show_img', { images: imagesWithBase64 }); // Render file .hbs với dữ liệu hình ảnh
          } catch (error) {
            res.status(500).send(error.message);
          }
    }
    
    async uploadfile(req, res) {
        try {
            const newFile = new Image({
              name: req.file.originalname,
              data: req.file.buffer,
              contentType: req.file.mimetype
            });
            await newFile.save();
            res.send({ message: 'File uploaded successfully', fileId: newFile._id });
          } catch (error) {
            res.status(500).send(error.message);
          }
    }

    async showfile(req, res) {
        try {
            const files = await Image.find().select('name _id');
            res.send(files);
          } catch (error) {
            res.status(500).send(error.message);
          }

    }
    
}

module.exports = new ImageController();