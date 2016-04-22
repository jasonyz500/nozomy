//route for GET /posts
function getAllPosts(request, reply) {
	console.log("get posts payload: "+JSON.stringify(request.payload));
	mongodb.getAllPosts(request.payload, function(response) {
		reply(response);
	});
}

// route for GET /charts/:id
function getSinglePost(request, reply) {
	console.log("get single post id: " + JSON.stringify(request.params.id));
	mongodb.getSinglePost(request.params.id, function(response) {
		reply(response);
	});
}

// route for POST /posts/new
function createPost(request, reply) {
	console.log("create post payload: "+JSON.stringify(request.payload));
	mongodb.createPost(request.payload, function(response) {
		reply(response);
	});
}

exports.register = function (server, options, next) {

	mongodb = server.plugins.mongodb.mongodbClient;

	server.route({
		path: '/posts',
		method: 'GET',
		handler: getAllPosts
	});

	server.route({
		path: '/posts/{id}',
		method: 'GET',
		handler: getSinglePost
	});

	server.route({
		path: '/posts/new',
		method: 'POST',
		handler: createPost
	});

	next();
};

exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};
