'use strict';

const Joi = require('joi');

exports.register = function (server, options, next) {

	let reflectionsModel;
	server.dependency('db', (server, after) => {
		reflectionsModel = server.plugins.models.reflectionsModel;
		return after();
	});

	const joiId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

	const joiSchema = Joi.object().keys({
		_id: joiId
	});

    server.route({
        path: '/reflections/{id}',
        method: 'GET',
		config: {
			auth: 'token',
			validate: {
				params: { id: joiId.required() }
			},
			handler: function(request, reply) {
				reflectionsModel.getSingleReflection(request.params.id, request.auth.credentials, function(response) {
					reply(response);
				});
			},
			description: 'Get a reflection by ID'
		}
    });

    server.route({
        path: '/reflections/',
        method: 'POST',
		config: {
			auth: 'token',
			handler: function(request, reply) {
				request.log(['info'], 'POST /reflections/ with payload: ' + JSON.stringify(request.payload));
				reflectionsModel.getAllReflections(request.payload, request.auth.credentials, function(response) {
					reply(response);
				});
			},
			description: 'Get all reflections fulfilling search criteria'
		}
    });

	server.route({
        path: '/reflections/{id}',
        method: 'POST',
		config: {
			auth: 'token',
			validate: {
				params: { id: joiId.required() }
			},
			handler: function(request, reply) {
				reflectionsModel.updateSingleReflection(request.params.id, request.payload.reflection_body, request.auth.credentials, function(response){
					reply(response)
				});
			},
			description: 'Edit a reflection by ID'
		}
    });

    // delete reflection

	return next();
}

exports.register.attributes = {
	name: 'routes-reflections',
	version: '1.0.0'
};