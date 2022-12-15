const url = require("url");
const fs = require("fs");
const path = require("path");

const processError = require("../utils/processError");
const processSuccess = require("../utils/processSuccess");

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname == "/" && req.method === "GET") {
        let homePath = path.normalize(
            path.join(__dirname, "../views/home/index.html")
        );

        let catsPath = path.normalize(
            path.join(__dirname, "../data/cats.json")
        );

        fs.readFile(catsPath, "utf-8", (err, data) => {
            if (err) {
                processError(err, res);
                return;
            }

            const cats = JSON.parse(data);

            fs.readFile(homePath, "utf-8", (err, data) => {
                if (err) {
                    processError(err, res);
                    return;
                }

                let modifiedCats = cats.map((c) => {
                    return `<li>
                        <img src="${c.image ? c.image : ""}" alt="${c.name}">
                        <h3>${c.name}</h3>
                        <p><span>Breed: </span>${c.breed}</p>
                        <p>${c.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/edit/${
                                c.id
                            }">Change Info</a></li>
                            <li class="btn delete"><a href="/find-new-home/${
                                c.id
                            }">New Home</a></li>
                        </ul>
                    </li>`;
                });

                let modifiedData = data
                    .toString()
                    .replace("{{cats}}", modifiedCats);

                processSuccess(res, modifiedData);
            });
        });
    } else {
        return true;
    }
};
