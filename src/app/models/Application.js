const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Application = new Schema({
    KeyApp: String,
    KeyJob: String,
    CV: String,
  });

module.exports = mongoose.model('Application', Application, 'applications');