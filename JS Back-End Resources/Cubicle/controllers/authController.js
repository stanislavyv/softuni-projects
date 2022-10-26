const { Router } = require('express');

const { login, register } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const isGuest = require('../middlewares/isGuest');

const routes = Router();

routes.get('/register', isGuest(), (req, res) => {
    res.render('registerPage');
});

routes.post('/register', isGuest(), (req, res) => {
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

routes.get('/login', isGuest(), (req, res) => {
    res.render('loginPage');
});

routes.post('/login', isGuest(), (req, res) => {
    const { username, password } = req.body;

    login(username, password)
        .then((token) => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch((e) => {
            console.log(e);
            res.render('loginPage', { message: e.message });
        });
});

module.exports = routes;
