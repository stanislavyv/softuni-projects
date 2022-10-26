const { Router } = require('express');

const { login, register } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const routes = Router();

routes.get('/register', (req, res) => {
    res.render('registerPage');
});

routes.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('registerPage', { message: "Passwords don't match" });
    }

    register(username, password)
        .then(() => res.redirect('/login'))
        .catch((e) => {
            res.render('registerPage', { message: e.message });
        });
});

routes.get('/login', (req, res) => {
    res.render('loginPage');
});

routes.post('/login', (req, res) => {
    const { username, password } = req.body;

    login(username, password)
        .then((token) => {
            res.cookie(COOKIE_NAME, token);
            res.redirect('/');
        })
        .catch((e) => {
            console.log(e);
            res.render('loginPage', { message: e.message });
        });
});

module.exports = routes;
