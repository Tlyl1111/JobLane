const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSeeker = new Schema({
    DoB: String,
    KeyAcc: String,
    Address: String,
    Bio: String,
    CV: String,
  });

module.exports = mongoose.model('JobSeeker', JobSeeker, 'jobseekers');