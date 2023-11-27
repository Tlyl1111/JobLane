const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDetail = new Schema({
    KeyJD: String,
    Type: String,
    Category: Array,
    Specialization: String,
    CompanyType: String,
    Field: String,
    Salary: String,
    Description: String,
    Policy: String,
    Experience: String,
    Location: String,
    Requirement: String,
    ApplyBtn: String,
    HiringProcess: String,
    HowtoApply: String,
  });

module.exports = mongoose.model('JobDetail', JobDetail, 'jobdetails');