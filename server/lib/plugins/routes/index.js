var moment = require('moment'),
	Boom = require('boom');

//route for GET /write_page/:cutoff_date
function getWritePage(request, reply) {
	var cutoff_date = request.params.cutoff_date;

	// validation
	try {
		var date = moment(cutoff_date);
		if (!date.isValid()) {
			return reply(Boom.badRequest('Invalid date'));
      }
		if ( date.day() != 0 ) {
			return reply(Boom.badRequest(cutoff_date + ' is not a Sunday.'));
      }
	} catch (e) {
		return reply(Boom.badRequest('Invalid date'));
	}

	reflection_ids = []
	mongodb.getWritePage(request.params, request.auth.credentials, function(writepage) {
		if (!writepage) {
			mongodb.getWritePageSettings(request.auth.credentials, function(writepagesettings) {
				console.log('writepagesettings' + writepagesettings)
				prompts = writepagesettings['reflection_prompts']
				count =0;
				for (prompt of prompts) {
					console.log('prompt ' + prompt)
					reflection = {}
					reflection['reflection_cutoff_date'] = cutoff_date
					reflection['reflection_prompt'] = prompt
					reflection['reflection_body'] = ''
					mongodb.createReflection(reflection, request.auth.credentials, function(response) {
						console.log('reflection id' + response);
						reflection_ids.push(response)
						count++
						if(count == prompts.length) {
							newWritePage = {}
							newWritePage['reflection_ids']= reflection_ids
							newWritePage['cutoff_date']= cutoff_date
							mongodb.createWritePage(newWritePage, request.auth.credentials, function(response) {
								console.log('newWritePage id' + response);
								newWritePage['_id'] = response
								console.log(JSON.stringify(newWritePage))
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
}

// GET /reflections/:id
function getSingleReflection(request, reply) {
	mongodb.getSingleReflection(request.params.id, request.auth.credentials, function(response) {
		reply(response);
	});
}

// POST /reflections/:id
function updateSingleReflection(request, reply) {
	mongodb.updateSingleReflection(request.params.id, request.payload.reflection_body, request.auth.credentials, function(response){
		reply(response)
	});
}

// route for GET /settings/
function getWritePageSettings(request, reply) {
	mongodb.getWritePageSettings(request.auth.credentials, function(response) {
		reply(response);
	});
}

// route for POST /settings/
function updateWritePageSettings(request, reply) {
	mongodb.updateWritePageSettings(request.payload, request.auth.credentials, function(response) {
		reply(response);
	});
}

//route for POST /reflections
function getAllReflections(request, reply) {
	mongodb.getAllReflections(request.payload, request.auth.credentials, function(response) {
		reply(response);
	});
}

exports.register = function (server, options, next) {

	var mongodb = server.plugins.mongodb.mongodbClient;

	server.route({
        path: '/write_page/{cutoff_date}',
        method: 'GET',
		config: {
			auth: 'token',
			handler: getWritePage
		}
    });

    server.route({
        path: '/reflections/{id}',
        method: 'POST',
		config: {
			auth: 'token',
			handler: updateSingleReflection
		}
    });

    server.route({
        path: '/reflections/{id}',
        method: 'GET',
		config: {
			auth: 'token',
			handler: getSingleReflection
		}
    });

    server.route({
        path: '/settings/',
        method: 'POST',
		config: {
			auth: 'token',
			handler: updateWritePageSettings
		}
    });

    server.route({
        path: '/settings/{username}',
        method: 'GET',
		config: {
			auth: 'token',
			handler: getWritePageSettings
		}
    });

    server.route({
        path: '/reflections/',
        method: 'POST',
		config: {
			auth: 'token',
			handler: getAllReflections
		}
    });

	next();
};

exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};
