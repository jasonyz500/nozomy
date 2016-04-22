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
	models.Post.find({post_date: {$gt: params.start_date, $lt:params.end_date}},

	   function (err, posts) {
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
			console.log("successfully created post");
			cb("successfully created post");
		}
	});
}
