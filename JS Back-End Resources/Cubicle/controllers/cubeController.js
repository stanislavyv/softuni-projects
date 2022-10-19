const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

routes.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

module.exports = routes;
