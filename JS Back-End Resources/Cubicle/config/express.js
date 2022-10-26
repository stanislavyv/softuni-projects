const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

const setupExpress = (app) => {
    app.engine(
        'hbs',
        handlebars({
            extname: 'hbs',
        })
    );
    app.set('view engine', 'hbs');

    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.static('public'));

    app.use(cookieParser());

    app.use(auth());
};

module.exports = setupExpress;
