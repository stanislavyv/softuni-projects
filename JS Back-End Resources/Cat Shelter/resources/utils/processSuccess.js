module.exports = (res, data, contentType = "text/html") => {
    res.writeHead(200, {
        "Content-Type": `${contentType}`,
    });
    res.write(data);
    res.end();
};
