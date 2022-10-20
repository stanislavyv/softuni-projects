const cubeData = require('./utils/cubeData');
const Cube = require('../models/Cube');

const cubeService = () => {
    const getAll = () => cubeData.getAll();
    const getById = (id) => cubeData.getById(id);

    const create = (data) => {
        const cube = new Cube(data);
        return cubeData.create(cube);
    };

    return {
        getAll,
        getById,
        create,
    };
};

module.exports = cubeService();
