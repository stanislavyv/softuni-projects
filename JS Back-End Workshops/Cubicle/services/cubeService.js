// const cubeData = require('./utils/cubeData.js');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');
const accessoryService = require('./accessoryService');

const cubeService = () => {
    const getAll = (inputQuery) => {
        const { search, from, to } = inputQuery;
        let query = {};

        if (search) {
            query = { ...query, name: { $regex: search, $options: 'i' } };
        }

        if (from) {
            query = { ...query, difficultyLevel: { $gte: +from } };
        }

        if (to) {
            query = {
                ...query,
                difficultyLevel: { ...query.difficultyLevel, $lte: +to },
            };
        }

        return Cube.find(query).lean();
    };

    const getById = (id) => {
        return Cube.findById(id).lean();
    };

    const getByIdWithAccessories = (id) => {
        return Cube.findById(id).populate('accessories').lean();
    };

    const create = (data) => {
        const cube = new Cube(data);
        cube.accessories = [];
        return cube.save();
    };

    const attachAccessory = async function (cubeId, accessoryId) {
        const accessory = await Accessory.findById(accessoryId);
        const cube = await Cube.findById(cubeId);

        cube.accessories.push(accessory);
        return cube.save();
    };

    const editOne = (id, data) => {
        return Cube.findByIdAndUpdate(id, data);
    };

    const deleteOne = (id) => {
        return Cube.deleteOne({ _id: id });
    };

    return {
        getAll,
        getById,
        getByIdWithAccessories,
        create,
        attachAccessory,
        editOne,
        deleteOne,
    };
};

module.exports = cubeService();
