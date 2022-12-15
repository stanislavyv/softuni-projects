module.exports = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        next();
    };
};
