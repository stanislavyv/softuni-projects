const { Router } = require('express');
const cubeService = require('../services/cubeService');
const { validateCube } = require('./utils/validator');

const routes = Router();

routes.get('/', (req, res) => {
    cubeService
        .getAll(req.query)
        .then((cubes) => {
            res.render('index', { title: 'Home', cubes });
        })
        .catch(() => res.status(500).end());
});

routes.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

routes.post('/create', validateCube, (req, res) => {
    const data = req.body;

    cubeService
        .create(data)
        .then(res.redirect('/'))
        .catch(res.status(500).end());
});

routes.get('/details/:id', (req, res) => {
    cubeService.getById(req.params.id).then((cube) => {
        res.render('details', { title: 'Details', cube });
    });
});

module.exports = routes;
