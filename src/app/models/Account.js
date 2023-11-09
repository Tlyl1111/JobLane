const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    keyacc: String,
    email: String,
    password: String,
    role: String,
  });

  module.exports = mongoose.model('Account', Account, 'Account');