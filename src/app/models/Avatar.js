const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Avatar = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobseekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobseeker' },
});

module.exports = mongoose.model('Avatar', Avatar, 'avatars');