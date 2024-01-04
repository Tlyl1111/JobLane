const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    KeyUser: String,
    Name: String,
    Phone: String,
    Email: String,
    KeyCompany: String,
    accId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    avtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' },
  });

module.exports = mongoose.model('User', User, 'users');