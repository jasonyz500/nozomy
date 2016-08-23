'use strict';

const usersModel = require('./users'),
	reflectionsModel = require('./reflections'),
	writePageModel = require('./write-page'),
	settingsModel = require('./settings');

exports.register = function(server, options, next) {

	server.expose('usersModel', usersModel);
	server.expose('reflectionsModel', reflectionsModel);
	server.expose('writePageModel', writePageModel);
	server.expose('settingsModel', settingsModel);

	return next();
}

exports.register.attributes = {
	name: 'models',
	version: '1.0.0'
}
