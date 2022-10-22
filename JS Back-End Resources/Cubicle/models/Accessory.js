const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);