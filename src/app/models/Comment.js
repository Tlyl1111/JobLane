const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    KeyComment: String,
    Comment: String,
    KeyJob: String,
  });

module.exports = mongoose.model('Comment', Comment, 'comments');