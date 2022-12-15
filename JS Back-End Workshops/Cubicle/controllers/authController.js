const { Router } = require('express');

const { login, register, doesUserExist } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

const validator = require('./utils/validator');
const { validationResult } = require('express-validator');
const saveOriginalData = require('./utils/saveOriginalData');

const routes = Router();

routes.get('/register', isGuest(), (req, res) => {
    res.render('registerPage', { title: 'Register' });
});

routes.post(
    '/register',
    isGuest(),
    saveOriginalData,
    validator.register,
    (req, res) => {
        const { username, password, repeatPassword } = req.body;

        try {
            if (password !== repeatPassword) {
                throw { message: "Passwords don't match" };
            }

            if (doesUserExist(username))
                throw { message: 'Username already taken' };

            const errors = validationResult(req);
            if (!errors.isEmpty()) throw { message: errors.array()[0].msg };

            register(username, password).then(() => {
                res.redirect('/login');
            });
        } catch (e) {
            return res.render('registerPage', {
                username: req.originalData.username,
                message: e.message,
            });
        }
    }
);

routes.get('/login', isGuest(), (req, res) => {
    res.render('loginPage', { title: 'Login' });
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

routes.get('/logout', isAuthenticated(), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = routes;
