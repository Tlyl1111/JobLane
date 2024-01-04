const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
});

module.exports = mongoose.model('Image', Image, 'images');