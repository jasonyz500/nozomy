const Code = require('code'),
	Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../lib/index.js');

lab.before((done) => {
	server.on('pluginsLoaded', done);
});

lab.test('It will return Hello hapi', (done) => {
	server.inject({
		method: 'GET',
		url: '/'
	}, (res) => {
		Code.expect(res.statusCode).to.equal(200);
		Code.expect(res.result).to.equal('Hello hapi');
		done();
	});
});