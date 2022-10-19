const fs = require("fs");
const processError = require("./processError");
const processSuccess = require("./processSuccess");

module.exports = (filePath, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            processError(err, res);
            return;
        }
        
        processSuccess(res, data);
    });
};
