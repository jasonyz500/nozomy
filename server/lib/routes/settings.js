'use strict';

const Joi = require('joi');

exports.register = function (server, options, next) {

	let settingsModel;
	server.dependency('db', (server, after) => {
		settingsModel = server.plugins.models.settingsModel;
		return after();
	});

	const joiId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

	const joiSchema = Joi.object().keys({
		_id: joiId
	});

    server.route({
        path: '/settings',
        method: 'POST',
		config: {
			auth: 'token',
			validate: { payload: joiSchema },
			handler: function(request, reply) {
				settingsModel.updateWritePageSettings(request.payload, request.auth.credentials, function(response) {
					reply(response);
				});
			},
			description: 'Update settings page for user'
		}
    });

    server.route({
        path: '/settings/{user_id}',
        method: 'GET',
		config: {
			auth: 'token',
			validate: {
				params: { user_id: joiId.required() }
			},
			handler: function(request, reply) {
				settingsModel.getWritePageSettings(request.auth.credentials, function(response) {
					reply(response);
				});
			},
			description: 'Get settings page for user'
		}
    });

	return next();
}

exports.register.attributes = {
	name: 'routes-settings',
	version: '1.0.0'
};