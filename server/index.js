var Hapi = require('hapi'),
    config = require('./config');

var server = new Hapi.Server();
   
server.connection({ port: 8000, host: '0.0.0.0', routes: { cors: {"headers": ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]}}});

server.route({
	path: '/', 
	method:'GET', 
	handler: function (request, reply) {
        console.log('hello hapi');
		reply('Hello hapi');
	}
});

server.register([
    {
        register: require('./plugins/mongodb'),
        options: {config: config.mongodb}
    },
    {
        register: require('./plugins/routes')
    }
    ], function (err) {
        if (err) {
            console.log('error loading plugin');
        }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
