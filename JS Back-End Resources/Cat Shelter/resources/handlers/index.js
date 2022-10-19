const homeHandler = require('./homeHandler');
const staticHandler = require('./staticFilesHandler');
const catHandler = require('./catHandler');

module.exports = [homeHandler, staticHandler, catHandler];