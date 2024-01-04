const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CV = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    jobseekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
});

module.exports = mongoose.model('CV', CV, 'CVs');