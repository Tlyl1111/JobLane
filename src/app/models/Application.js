const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Application = new Schema({
    CV: String,
    CoverLetter: String,
    Status: String,
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    Job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
    CVId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV' },
    Company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
  });

module.exports = mongoose.model('Application', Application, 'applications');