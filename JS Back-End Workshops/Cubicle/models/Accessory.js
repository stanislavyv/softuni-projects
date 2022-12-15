const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 80,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
});

module.exports = mongoose.model('Accessory', accessorySchema);
