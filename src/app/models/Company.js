const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
    KeyCompany: String,
    QuantityEmployee: Number,
    Follower: Number,
    Website: String,
    Name: String,
    Description: String,
    Avatar: String,
    Address: String,
  });

module.exports = mongoose.model('Company', Company, 'companies');