var mongodb = require('./mongodb');

exports.register = function (server, options, next) {
	
	var mongodbClient = new mongodb(options.config);
	server.expose('mongodbClient', mongodbClient);
	next();
};

exports.register.attributes = {
    name: 'mongodb',
    version: '1.0.0'
};
