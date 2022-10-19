const http = require("http");
const port = 3001;
const handlers = require('./handlers/index');

http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }

}).listen(port, () => console.log(`Server is listening at port ${port}...`));