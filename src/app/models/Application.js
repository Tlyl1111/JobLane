const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Application = new Schema({
    KeyUser: String,
    KeyJob: String,
    CV: String,
  });

module.exports = mongoose.model('Application', Application, 'applications');