var jwt = require('jsonwebtoken'),
	hapiAuthJwt = require('hapi-auth-jwt');

const privateKey = 'josephiana';


function validate(request, decoded, callback) {
	return callback(null, true, {username: 'jason'});
	// mongodb.findUser(decoded.user, function(response) {
	// 	if (response) {
	// 		return callback(null, true, response);
	// 	} else {
	// 		return callback(null, false, null);
	// 	}
	// });
}

function login(request, reply) {
	var username = request.payload.username || '';
	var password = request.payload.password || '';
	console.log('username: ', username);

	if (username == 'jason' && password == 'jason') {
		console.log('p1');
		var user = {};
		user.username = 'jason';
		var token = jwt.sign({user: user}, privateKey, {algorithm: 'HS256'});
		return reply({auth_token: token});
	}
	reply({error: 'invalid credentials'});
}

exports.register = function(server, options, next) {
	mongodb = server.plugins.mongodb.mongodbClient;

	server.register(hapiAuthJwt, (err) => {
		server.auth.strategy('token', 'jwt', {
			key: privateKey,
			validateFunc: validate,
			verifyOptions: { algorithms: ['HS256']}
		});
		server.route({
			path: '/login',
			method: 'POST',
			handler: login
		});
		next();
	});
};

exports.register.attributes = {
    name: 'auth',
    version: '1.0.0'
};