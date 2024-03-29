const cubes = require('../../config/database.json');
const path = require('path');
const fs = require('fs/promises');

const getCubeData = () => {
    const getAll = () => cubes.slice();
    const getById = (id) => cubes.find((c) => c.id === id);
    const create = (data) => {
        cubes.push(data);

        const cubesPath = path.normalize(
            path.join(__dirname, '../../config/database.json')
        );

        return fs.writeFile(cubesPath, JSON.stringify(cubes));
    };

    return {
        getAll,
        getById,
        create,
    };
};

module.exports = getCubeData();
