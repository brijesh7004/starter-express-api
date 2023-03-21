const http = require("http");
const app = require("./app");

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(app, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello Serve Node");
});

server.listen(port, hostname, () => {
    console.log('server is running at https://${hostname}:${port}');
});