const Config = require('./modules/config');
const Server = require('./src/http/setUpServer');

const server = new Server(Config.get('HOST'), Config.get('PORT'));

server.build().serve();
