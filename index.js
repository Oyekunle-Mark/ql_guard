const Server = require('./src/http/setUpServer');

const host = 'localhost';
const port = 8000;

const server = new Server(host, port);

server.build().serve();
