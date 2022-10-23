const { Router } = require('express');

const routes = Router();
const accessoryService = require('../services/accessoryService');

routes.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Add an Accessory' });
});

routes.post('/create', (req, res) => {
    const data = req.body;

    accessoryService
        .create(data)
        .then(() => res.status(201).redirect('/'))
        .catch(() => res.status(400).end());
});

module.exports = routes;
