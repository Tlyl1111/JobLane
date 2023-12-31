const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobDetail = new Schema({
    Type: String,
    Category: String,
    Specialization: String,
    CompanyType: String,
    Field: String,
    Salary: String,
    Description: String,
    Policy: String,
    Experience: String,
    Location: String,
    Requirement: String,
    //ApplyBtn: String,
    HiringProcess: String,
    HowtoApply: String,
    JobID: { type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
    CompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    Category1: String,  
    Category2: String,
    Category3: String, 
  });

module.exports = mongoose.model('JobDetail', JobDetail, 'jobdetails');