const express = require("express");
const handlebars = require("express-handlebars");

const setupExpress = (app) => {
    app.engine("hbs", handlebars({
        extname: 'hbs'
    }));
    app.set("view engine", "hbs");

    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.static('public'));
};

module.exports = setupExpress;
