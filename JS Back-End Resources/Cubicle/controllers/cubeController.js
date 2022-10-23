const { Router } = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
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
        .then(res.status(201).redirect('/'))
        .catch(res.status(400).end());
});

routes.get('/details/:id', (req, res) => {
    cubeService.getById(req.params.id).then((cube) => {
        res.render('details', { title: 'Details', cube });
    });
});

routes.get('/details/:id/attach', async (req, res) => {
    const cube = await cubeService.getById(req.params.id);
    const accessories = await accessoryService.getAll();
    
    res.render('attachAccessory', { title: 'Attach', cube, accessories });
});

module.exports = routes;
