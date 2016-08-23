const Code = require('code'),
	Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../../lib/index.js');

lab.test('It will login', (done) => {
	server.inject({
		method: 'POST',
		url: '/login',
		payload: {
			username: 'jason',
			password: 'jason'
		}
	}, (res) => {
		Code.expect(res.statusCode).to.equal(200);
		done();
	});
});