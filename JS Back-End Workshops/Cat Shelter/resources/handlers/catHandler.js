const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const formidable = require("formidable");

const breeds = require("../data/breeds.json");
const cats = require("../data/cats.json");

const processReadFile = require("../utils/processReadFile");
const processSuccess = require("../utils/processSuccess");
const processError = require("../utils/processError");

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === "/cats/add-cat" && req.method === "GET") {
        let filePath = path.normalize(
            path.join(__dirname, "../views/addCat.html")
        );

        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                processError(err, res);
                return;
            }

            let breedsOptions = breeds.map(
                (b) => `<option value=${b}>${b}</option>`
            );

            let modifiedData = data
                .toString()
                .replace("{{catBreeds}}", breedsOptions);

            processSuccess(res, modifiedData);
        });
    } else if (pathname === "/cats/add-breed" && req.method === "GET") {
        let filePath = path.normalize(
            path.join(__dirname, "../views/addBreed.html")
        );

        processReadFile(filePath, res);
    } else if (pathname === "/cats/add-breed" && req.method === "POST") {
        let formData = "";
        let filePath = path.normalize(
            path.join(__dirname, "../data/breeds.json")
        );

        req.on("data", (data) => {
            formData += data;
        });

        req.on("end", () => {
            let body = qs.parse(formData);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile(filePath, json, "utf-8", (err) => {
                    if (err) {
                        throw err;
                    }

                    console.log("The breed was uploaded successfully");
                });

                res.writeHead(301, { location: "/" });
                res.end();
            });
        });
    } else if (pathname === "/cats/add-cat" && req.method === "POST") {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }

            let oldPath = files.upload.filepath;
            let newPath = path.normalize(
                path.join(
                    __dirname,
                    "../content/images/",
                    files.upload.originalFilename
                )
            );

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
            });

            let catsPath = path.normalize(
                path.join(__dirname, "../data/cats.json")
            );
            fs.readFile(catsPath, "utf-8", (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({
                    id: cats.length + 1,
                    ...fields,
                    image: `../content/images/${files.upload.originalFilename}`,
                });
                let json = JSON.stringify(allCats);

                fs.writeFile(catsPath, json, "utf8", (err) => {
                    if (err) {
                        throw err;
                    }

                    res.writeHead(301, {
                        location: "/",
                    });
                    res.end();
                });
            });
        });
    } else if (pathname.includes("/edit") && req.method === "GET") {
        const filePath = path.normalize(
            path.join(__dirname, "../views/editCat.html")
        );

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            const catId = pathname.split("/").pop();
            const cat = cats.find((c) => c.id == catId);

            let modifiedData = data.toString().replace("{{catId}}", cat.id);
            modifiedData = modifiedData.replace("{{catName}}", cat.name);
            modifiedData = modifiedData.replace(
                "{{catDescription}}",
                cat.description
            );

            const breedOptions = breeds.map(
                (b) => `<option value=${b}>${b}</option>`
            );

            modifiedData = modifiedData.replace(
                "{{catBreeds}}",
                breedOptions.join("")
            );

            processSuccess(res, modifiedData);
        });
    } else if (pathname.includes("/edit") && req.method === "POST") {
        const catId = pathname.split("/").pop();

        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }

            let oldPath = files.image.filepath;
            let newPath = path.normalize(
                path.join(
                    __dirname,
                    "../content/images/",
                    files.image.originalFilename
                )
            );

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
            });

            let catsPath = path.normalize(
                path.join(__dirname, "../data/cats.json")
            );
            fs.readFile(catsPath, "utf-8", (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);
                fields = { ...fields, id: Number(catId) };

                const index = allCats.findIndex((c) => c.id == catId);
                allCats[index] = {
                    ...fields,
                    id: catId,
                    image: `../content/images/${files.image.originalFilename}`,
                };

                let json = JSON.stringify(allCats);

                fs.writeFile(catsPath, json, "utf8", (err) => {
                    if (err) {
                        throw err;
                    }

                    res.writeHead(301, {
                        location: "/",
                    });
                    res.end();
                });
            });
        });
    } else if (pathname.includes("/find-new-home") && req.method === "GET") {
        const filePath = path.normalize(
            path.join(__dirname, "../views/catShelter.html")
        );

        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                throw err;
            }

            const catId = pathname.split("/").pop();
            const cat = cats.find((c) => c.id == catId);

            let modifiedData = data.toString().replace("{{catId}}", cat.id);
            modifiedData = modifiedData.replace("{{catName}}", cat.name);
            modifiedData = modifiedData.replace("{{catImage}}", cat.image);
            modifiedData = modifiedData.replace(
                "{{catDescription}}",
                cat.description
            );
            modifiedData.replace("{{catBreed}}", cat.breed);

            processSuccess(res, modifiedData);
        });
    } else if (pathname.includes("/find-new-home") && req.method === "POST") {
        const catId = pathname.split("/").pop();
        const catsPath = path.normalize(
            path.join(__dirname, "../data/cats.json")
        );

        fs.readFile(catsPath, "utf-8", (err, data) => {
            if (err) {
                throw err;
            }

            const cats = JSON.parse(data);
            const catIndex = cats.findIndex((c) => c.id == catId);
            cats.splice(catIndex, 1);
            const json = JSON.stringify(cats);

            fs.writeFile(catsPath, json, "utf-8", (err) => {
                if (err) {
                    throw err;
                }

                res.writeHead(301, {
                    location: "/",
                });
                res.end();
            });
        });
    } else {
        return true;
    }
};
