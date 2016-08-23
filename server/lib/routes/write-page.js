'use strict';

const Joi = require('joi'),
	moment = require('moment');

exports.register = function (server, options, next) {

	let writePageModel, reflectionsModel, settingsModel;

	server.dependency('db', (server, after) => {
		writePageModel = server.plugins.models.writePageModel;
		reflectionsModel = server.plugins.models.reflectionsModel;
		settingsModel = server.plugins.models.settingsModel;
		return after();
	});

	const joiId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

	const joiSchema = Joi.object().keys({
		_id: joiId
	});

	server.route({
		method: 'GET',
        path: '/write_page/{cutoff_date}',
		config: {
			auth: 'token',
	        validate: {
        		params: { cutoff_date: Joi.date().format('YYYY-MM-DD').required() }
        	},
			handler: function(request, reply) {
				let cutoff_date = moment(request.params.cutoff_date).format('YYYY-MM-DD');
				let reflection_ids = [];
				writePageModel.getWritePage(request.params, request.auth.credentials, function(writepage) {
					if (!writepage) {
						settingsModel.getWritePageSettings(request.auth.credentials, function(writepagesettings) {
							console.log('writepagesettings' + writepagesettings);
							let prompts = writepagesettings['reflection_prompts'];
							let count = 0;
							for (let prompt of prompts) {
								console.log('prompt ' + prompt)
								let reflection = {}
								console.log(request.params.cutoff_date);
								reflection['reflection_cutoff_date'] = cutoff_date;
								reflection['reflection_prompt'] = prompt;
								reflection['reflection_body'] = '';
								reflectionsModel.createReflection(reflection, request.auth.credentials, function(response) {
									console.log('reflection id' + response);
									reflection_ids.push(response);
									++count;
									if(count == prompts.length) {
										let newWritePage = {};
										newWritePage['reflection_ids'] = reflection_ids;
										newWritePage['cutoff_date'] = cutoff_date;
										writePageModel.createWritePage(newWritePage, request.auth.credentials, function(response) {
											console.log('newWritePage id' + response);
											newWritePage['_id'] = response;
											console.log(JSON.stringify(newWritePage));
											reply(newWritePage);
										});
			                      }
					          });
					      }
						});
					} else {
						reply(writepage);
					}
				});
			},
			description: 'Get or create new write page by date'
		}
    });

	return next();
}

exports.register.attributes = {
	name: 'routes-write-page',
	version: '1.0.0'
};