const cubeData = require('./utils/cubeData.js');
const Cube = require('../models/Cube');

const cubeService = () => {
    const getAll = (query) => {
        let cubes = cubeData.getAll();

        if (query.search) {
            cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search));
        }

        if (query.from) {
            cubes = cubes.filter(c => Number(c.level) >= Number(query.from))
        }

        if (query.to) {
            cubes = cubes.filter(c => Number(c.level) <= Number(query.to))
        }

        return cubes;
    };
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
