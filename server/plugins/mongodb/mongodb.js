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
  // console.dir({post_date: {$gt: params.start_date, $lt:params.end_date}})
   models.Post.find({post_date: {$gt: params.start_date, $lt:params.end_date}},

	   function (err, posts) {
		   if (err) {
			   console.error(err);
			   cb(null);
		   } else {
		       console.log('1: posts' + posts)
			   cb(posts);
		   }
	   });
   models.Post.find({post_date: {$gt: '20160421 16:03:00', $lt:'20160421 18:03:00'}},

	   function (err, posts) {
		   if (err) {
			   console.error(err);
//			   cb(null);
		   } else {
		       console.log('2: posts' + posts)
//			   cb(posts);
		   }
	   });
}

mongodbClient.prototype.getSinglePost = function(id, cb) {
	models.Post.findById(id, function(err, post) {
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

mongodbClient.prototype.getWritePageSettings = function(params, cb) {
	// validate params
	models.WritePageSetting.findById(id, function(err, settings) {
    		if (err) {
    			console.error(err);
    			cb(null);
    		} else {
    			cb(settings);
    		}
    	});
}



