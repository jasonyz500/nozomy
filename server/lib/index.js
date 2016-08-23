const Hapi = require('hapi'),
    config = require('./config');

const server = new Hapi.Server();
   
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
        register: require('good'),
        options: config.goodOptions
    },
    { register: require('blipp') },
    {
        register: require('./middlewares/mongodb'),
        options: config.mongodb
    },
    { register: require('./models') },
    { register: require('./middlewares/auth') },
    { register: require('./routes/reflections') },
    { register: require('./routes/settings') },
    { register: require('./routes/write-page') }

    ], function (err) {
        if (err) {
            console.error('error loading plugin: ', err);
        }
        server.start(() => {
            server.log(['info'], 'Server running at: '+server.info.uri);
            server.emit('pluginsLoaded');
    });
});

module.exports = server;
