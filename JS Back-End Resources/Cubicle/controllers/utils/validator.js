exports.validateCube = function (req, res, next) {
    let isValid = true;

    if (
        req.body.name.length < 3 ||
        req.body.name.length > 20 ||
        !req.body.imageUrl ||
        req.body.description.length < 4
    ) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
};
