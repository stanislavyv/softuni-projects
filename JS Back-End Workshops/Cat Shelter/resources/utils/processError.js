module.exports = (err, res, message = '404 Not Found') => {
    console.log(err);

    res.writeHead(404, {
        "Content-Type": "text/plain",
    });

    res.write(message);
    res.end();
};
