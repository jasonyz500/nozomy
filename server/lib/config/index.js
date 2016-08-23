var env = process.env.NOZOMY_ENV || 'development',
	cfg = require('./config.' + env);

module.exports = cfg
