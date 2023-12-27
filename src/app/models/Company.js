const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
    KeyCompany: String,
    //QuantityEmployee: Number,
    //Follower: Number,
    //Website: String,
    Name: String,
    Description: String,
    Goal: String,
    Logo: String,
    Address: String,
    Email: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

module.exports = mongoose.model('Company', Company, 'companies');