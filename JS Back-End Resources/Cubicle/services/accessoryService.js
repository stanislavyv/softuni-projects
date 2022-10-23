const Accessory = require('../models/Accessory');

module.exports = {
    getAll() {
        return Accessory.find({}).lean();
    },

    create(data) {
        const accessory = new Accessory(data);
        return accessory.save();
    },
};
