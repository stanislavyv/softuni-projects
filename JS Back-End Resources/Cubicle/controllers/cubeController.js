const { Router } = require('express');
const cubeService = require('../services/cubeService');

const routes = Router();

routes.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

routes.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

routes.post('/create', (req, res) => {
});

module.exports = routes;
