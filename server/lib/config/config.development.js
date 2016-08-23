var cfg = require('./config.prod');
cfg.mongodb.host = 'localhost';
cfg.mongodb.db = 'nozomy';
module.exports = cfg;
