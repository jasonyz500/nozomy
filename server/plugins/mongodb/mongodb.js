var mongoose = require('mongoose'),
	models = require('./models'),
    _ = require('underscore');

var mongodbClient = {};
module.exports = mongodbClient = function(options) {
	mongoose.connect('mongodb://' + options.host + '/' + options.db);
	var mongodb = mongoose.connection;
	mongodb.on('error', console.error.bind(console, 'connection error'));
	mongodb.once('open', function callback() {
             console.log("mongo db nozomy connected")
	});
}

mongodbClient.prototype.getAllPosts = function(params, cb) {
	models.Chart.find(function (err, charts) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			cb(posts);
		}
	});
}

mongodbClient.prototype.getSinglePost = function(id, cb) {
	models.Chart.findById(id, function(err, post) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			cb(post);
		}
	});
}

mongodbClient.prototype.createPost = function(params, cb) {
	// validate params
	console.log("inside mongodb" + params)
	var newPost = new models.Post(params);
	newPost.save(function (err, res) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			console.log("successfully created chart");
			cb("successfully created post");
		}
	});
}
