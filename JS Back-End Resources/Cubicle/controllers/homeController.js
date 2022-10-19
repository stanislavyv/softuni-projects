const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
    res.redirect("/cubes");
});

routes.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

module.exports = routes;
