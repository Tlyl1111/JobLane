const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDetail = new Schema({
    KeyJD: String,
    Type: String,
    Specialization: String,
    Field: String,
    Salary: String,
    Description: String,
    Policy: String,
    Experience: String,
    Location: String,
    Requirement: String,
    ApplyBtn: String,
  });

module.exports = mongoose.model('JobDetail', JobDetail, 'jobdetails');