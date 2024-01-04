const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Logo = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Logo', Logo, 'logos');