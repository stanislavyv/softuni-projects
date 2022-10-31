/**
 * Save pre-sanitized data in req
 */
module.exports = (req, res, next) => {
    req.originalData = req.body;
    next();
};
