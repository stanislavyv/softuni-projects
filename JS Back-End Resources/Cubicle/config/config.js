const config = {
    development: {
        PORT: 3001,
        DB_CONNECTION: 'mongodb://localhost/mongotest',
        SALT_ROUNDS: 6,
    },
    production: {
        PORT: 80,
    },
};

module.exports = config[process.env.NODE_ENV.trim()];
