const { COOKIE_NAME, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        const token = req.cookies[COOKIE_NAME];

        if (token) {
            jwt.verify(token, SECRET, (err, decodedToken) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decodedToken;
                    res.locals.userId = decodedToken;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    };
};
