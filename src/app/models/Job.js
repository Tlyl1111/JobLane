const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema({
    Title: String,
    QuantityApply: { type: Number, default: 0 },
    //State: String,
    PostDay: Date,
    EndDay: Date,
    Status: {type: String, default: 'assessing'},
    //Status = assessing: đang đánh giá
    //Status = approved: được duyệt
    //Status = rejected: không được duyệt
    CompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    JobDetailID: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDetail'},
    ImagPosstingID: { type: mongoose.Schema.Types.ObjectId, ref: 'ImgPosting'},
  });

module.exports = mongoose.model('Job', Job, 'jobs');