const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

const register = async (username, password) => {
    const alreadyCreated = await User.exists({ username });

    if (alreadyCreated) {
        throw { message: 'An user with that username already exists' };
    }

    const hash = await bcryptjs.hash(password, SALT_ROUNDS);

    const user = new User({ username, password: hash });
    return user.save();
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) throw { message: 'Try again' };

    const doesPassMatch = await bcryptjs.compare(password, user.password);

    if (!doesPassMatch) throw { message: 'Try again' };

    return jwt.sign({ _id: user._id }, SECRET);
};

module.exports = {
    register,
    login,
};
