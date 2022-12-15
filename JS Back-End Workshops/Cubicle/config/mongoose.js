const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = () => {
    mongoose.connect(config.DB_CONNECTION);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error: '));
    db.once('open', console.log.bind(console, 'DB connected.'));
};
