const { Router } = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isUserCreator = require('../middlewares/isUserCreator');

const validator = require('./utils/validator');
const saveOriginalData = require('./utils/saveOriginalData');
const { validationResult } = require('express-validator');

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

routes.post('/create', isAuthenticated(), validator.product, (req, res) => {
    const data = req.body;

    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) throw { message: errors.array()[0].msg };

        cubeService
            .create({ ...data, creator: req.user._id })
            .then(res.status(201).redirect('/'));
    } catch (e) {
        res.render('create', { message: e.message, cube: data });
    }
});

routes.get('/details/:id', (req, res) => {
    cubeService.getByIdWithAccessories(req.params.id).then((cube) => {
        const isCreator = req.user._id == cube.creator;

        res.render('details', {
            title: 'Details',
            cube,
            accessories: cube.accessories,
            isCreator,
        });
    });
});

routes.get(
    '/details/:id/attach',
    isAuthenticated(),
    isUserCreator(),
    async (req, res) => {
        const cube = await cubeService.getById(req.params.id);
        const accessories = await accessoryService.getAllNotIn(
            cube.accessories
        );

        res.render('attachAccessory', { title: 'Attach', cube, accessories });
    }
);

routes.post(
    '/details/:id/attach',
    isAuthenticated(),
    isUserCreator(),
    (req, res) => {
        cubeService
            .attachAccessory(req.params.id, req.body.accessory)
            .then(() => res.redirect(`/cubes/details/${req.params.id}`))
            .catch((e) => {
                console.log(e);
                res.status(401).end();
            });
    }
);

routes.get('/edit/:id', isAuthenticated(), isUserCreator(), (req, res) => {
    cubeService.getById(req.params.id).then((c) => {
        res.render('editCubePage', { title: 'Edit', cube: c });
    });
});

routes.post(
    '/edit/:id',
    isAuthenticated(),
    isUserCreator(),
    validator.product,
    (req, res) => {
        const data = req.body;

        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) throw { message: errors.array()[0].msg };

            cubeService
                .editOne(req.params.id, data)
                .then(res.status(200).redirect('/'));
        } catch (e) {
            res.render('editCubePage', { message: e.message, cube: data });
        }
    }
);

routes.get('/delete/:id', isAuthenticated(), isUserCreator(), (req, res) => {
    cubeService
        .deleteOne(req.params.id)
        .then(res.status(200).redirect('/'))
        .catch(res.status(400).end());
});

module.exports = routes;
