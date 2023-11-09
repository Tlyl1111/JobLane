const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://Joblane:Joblane@cluster0.hm3hmjm.mongodb.net/');
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
    }
}

module.exports = { connect };