const { Router } = require('express');

const authService = require('../services/authService');

const routes = Router();

routes.get('/register', (req, res) => {
    res.render('registerPage');
});

routes.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('registerPage', { message: "Passwords don't match" });
    }

    authService
        .register(username, password)
        .then(() => res.redirect('/login'))
        .catch((e) => {
            res.render('registerPage', { message: e.message });
        });
});

routes.get('/login', (req, res) => {
    res.render('loginPage');
});

module.exports = routes;
