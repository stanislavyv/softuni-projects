const { Router } = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { validateCube } = require('./utils/validator');

const isAuthenticated = require('../middlewares/isAuthenticated');

const routes = Router();

routes.get('/', (req, res) => {
    cubeService
        .getAll(req.query)
        .then((cubes) => {
            res.render('index', { title: 'Home', cubes });
        })
        .catch(() => res.status(500).end());
});

routes.get('/create', isAuthenticated(), (req, res) => {
    res.render('create', { title: 'Create' });
});

routes.post('/create', validateCube, isAuthenticated(), (req, res) => {
    const data = req.body;

    cubeService
        .create(data)
        .then(res.status(201).redirect('/'))
        .catch(res.status(400).end());
});

routes.get('/details/:id', (req, res) => {
    cubeService.getByIdWithAccessories(req.params.id).then((cube) => {
        res.render('details', {
            title: 'Details',
            cube,
            accessories: cube.accessories,
        });
    });
});

routes.get('/details/:id/attach', isAuthenticated(), async (req, res) => {
    const cube = await cubeService.getById(req.params.id);
    const accessories = await accessoryService.getAllNotIn(cube.accessories);

    res.render('attachAccessory', { title: 'Attach', cube, accessories });
});

routes.post('/details/:id/attach', isAuthenticated(), (req, res) => {
    cubeService
        .attachAccessory(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/cubes/details/${req.params.id}`))
        .catch((e) => {
            console.log(e);
            res.status(401).end();
        });
});

module.exports = routes;
