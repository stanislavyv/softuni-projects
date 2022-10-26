const { Router } = require('express');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use(authController);
router.use('/', homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
