// const cubeData = require('./utils/cubeData.js');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');
const accessoryService = require('./accessoryService');

const cubeService = () => {
    const getAll = (query) => {
        let cubes = Cube.find({}).lean();

        // TODO:
        if (query.search) {
            cubes = cubes.filter((c) =>
                c.name.toLowerCase().includes(query.search)
            );
        }

        if (query.from) {
            cubes = cubes.filter((c) => Number(c.level) >= Number(query.from));
        }

        if (query.to) {
            cubes = cubes.filter((c) => Number(c.level) <= Number(query.to));
        }

        return cubes;
    };

    const getById = (id) => {
        return Cube.findById(id).lean();
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

    return {
        getAll,
        getById,
        create,
        attachAccessory,
    };
};

module.exports = cubeService();
