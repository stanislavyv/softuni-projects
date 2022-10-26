const config = {
    development: {
        PORT: 3001,
        DB_CONNECTION: 'mongodb://localhost/mongotest',
        SALT_ROUNDS: 6,
        SECRET: 'v3ry$3cur3k3y_',
        COOKIE_NAME: 'MY_SESSION_COOKIE',
    },
    production: {
        PORT: 80,
    },
};

module.exports = config[process.env.NODE_ENV.trim()];
