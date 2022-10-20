const { Router } = require('express');
const cubeService = require('../services/cubeService');

const routes = Router();

routes.get('/', (req, res) => {
    const cubes = cubeService.getAll();
    res.render('index', { title: 'Home', cubes });
});

routes.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

routes.post('/create', (req, res) => {
    const data = req.body;

    cubeService.create(data)
        .then(res.redirect('/'))
        .catch(res.status(500).end());
});

module.exports = routes;
