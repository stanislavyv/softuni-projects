const { Router } = require('express');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

const router = Router();

router.use('/', homeController);
router.use('/cubes', cubeController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;