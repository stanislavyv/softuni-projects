const Accessory = require('../models/Accessory');

module.exports = {
    getAll() {
        return Accessory.find({}).lean();
    },

    getAllNotIn(accessoryArr) {
        return Accessory.find({ _id: { $nin: accessoryArr } }).lean();
    },

    getById(id) {
        return Accessory.findById(id).lean();
    },

    create(data) {
        const accessory = new Accessory(data);
        return accessory.save();
    },
};
