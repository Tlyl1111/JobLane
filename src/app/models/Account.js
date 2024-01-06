const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    KeyAcc: String,
    Email: String,
    Password: String,
    Role: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

module.exports = mongoose.model('Account', Account, 'accounts');