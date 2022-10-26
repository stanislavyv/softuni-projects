const { getById } = require('../services/cubeService');

module.exports = () => {
    return async (req, res, next) => {
        const cube = await getById(req.params.id);

        req.isCreator = req.user._id == cube?.creator;

        if (!req.isCreator) {
            res.redirect('/');
            return;
        }

        next();
    };
};
