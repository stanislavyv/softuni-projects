const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

module.exports = mongoose.model('User', userSchema);
