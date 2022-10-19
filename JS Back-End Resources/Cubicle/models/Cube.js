const getId = require('uniqid');

class Cube {
    constructor (data) {
        this.id = getId();
        this.name = data.name;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.level = data.level;
    }
}

module.exports = Cube;