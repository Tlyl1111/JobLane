const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgPosting = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
});

module.exports = mongoose.model('ImgPosting', ImgPosting, 'imgpostings');