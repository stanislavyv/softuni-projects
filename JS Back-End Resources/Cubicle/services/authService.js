const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { SALT_ROUNDS } = require('../config/config');

const register = async (name, password) => {
    const alreadyCreated = await User.exists({ username: name });

    if (alreadyCreated) {
        throw { message: 'An user with that username already exists' };
    }

    const hash = await bcryptjs.hash(password, SALT_ROUNDS);

    const user = new User({ username: name, password: hash });
    return user.save();
};

module.exports = {
    register,
};
