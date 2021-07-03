const Configuration = require('./config');

const Config = new Configuration();
Config.initiate('.env');

module.exports = Config;
