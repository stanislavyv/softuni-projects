const config = require("./config/config");

const express = require("express");
const router = require("./routes");

const app = express();

const setupExpress = require("./config/express");
setupExpress(app);

app.use(router);

app.listen(config.PORT, () =>
    console.log(`Listening on port ${config.PORT}...`)
);
