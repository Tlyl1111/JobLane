const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema({
    KeyJob: String,
    Title: String,
    QuantityApply: String,
    //State: String,
    PostDay: Date,
    EndDay: Date,
    KeyJD: String,
    KeyCompany: String,
    Status: String,
    //Status = assessing: đang đánh giá
    //Status = approved: được duyệt
    //Status = rejected: không được duyệt
  });

module.exports = mongoose.model('Job', Job, 'jobs');