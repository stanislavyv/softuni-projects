const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');

const saveOriginalData = require('./utils/saveOriginalData');

const routes = Router();
const accessoryService = require('../services/accessoryService');

const validator = require('./utils/validator');
const { validationResult } = require('express-validator');

routes.get('/create', isAuthenticated(), (req, res) => {
    res.render('createAccessory', { title: 'Add an Accessory' });
});

routes.post(
    '/create',
    isAuthenticated(),
    saveOriginalData,
    validator.product,
    (req, res) => {
        const data = req.body;
        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) throw { message: errors.array()[0].msg };

            accessoryService.create(data).then(() => {
                res.status(201).redirect('/');
            });
        } catch (e) {
            res.render('createAccessory', {
                message: e.message,
                name: req.originalData.name,
                imageUrl: req.originalData.imageUrl,
                description: req.originalData.description,
            });
        }
    }
);

module.exports = routes;
