const config = {
    development: {
        PORT: 3001,
        DB_CONNECTION: 'mongodb://localhost/mongotest'
    },
    production: {
        PORT: 80,
    },
};

module.exports = config[process.env.NODE_ENV.trim()];