const url = require("url");
const fs = require("fs");
const path = require("path");

const processError = require("../utils/processError");
const processSuccess = require("../utils/processSuccess");

function getContentType(url) {
    if (url.endsWith("css")) {
        return "text/css";
    } else if (url.endsWith("html")) {
        return "text/html";
    } else if (url.endsWith("png")) {
        return "image/png";
    } else if (url.endsWith("jpg" || url.endsWith("jpeg"))) {
        return "image/jpeg";
    } else if (url.endsWith("ico")) {
        return "image/x-icon";
    } else if (url.endsWith("webp")) {
        return "image/webp";
    } else if (url.endsWith("js")) {
        return "text/javascript";
    } else {
        return "text/plain";
    }
}

module.exports = (req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname.includes("/content/") && req.method === "GET") {
        if (pathname.startsWith("/content")) {
            pathname = path.join("..", pathname);
        }

        const filePath = path.normalize(
            path.join(__dirname, pathname)
        );

        if (
            pathname.endsWith("png") ||
            pathname.endsWith("jpg") ||
            pathname.endsWith("jpeg") ||
            pathname.endsWith("webp") ||
            pathname.endsWith("ico")
        ) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    processError(err, res, "Error was found");
                    return;
                }

                processSuccess(res, data, getContentType(pathname));
            });

            return;
        }

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                processError(err, res, "Error was found");
                return;
            }

            processSuccess(res, data, getContentType(pathname));
        });
    } else {
        return true;
    }
};
