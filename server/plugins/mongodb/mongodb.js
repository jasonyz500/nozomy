var mongoose = require('mongoose'),
	models = require('./models'),
	moment = require('moment'),
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
	/*models.WritePageSetting.findById(id, function(err, settings) {
    		if (err) {
    			console.error(err);
    			cb(null);
    		} else {
    			cb(settings);
    		}
    	});*/
    	WritePageSetting = {}
    	WritePageSetting['user_name'] = 'qingzou'
    	WritePageSetting['reflection_prompts'] = []
    	WritePageSetting['reflection_prompts'].push('question1')
    	WritePageSetting['reflection_prompts'].push('question2')
    return cb(JSON.stringify(WritePageSetting))
}

mongodbClient.prototype.createReflection = function(params, cb) {
	// validate params
	console.log("inside mongodb" + params)
	var newReflection = new models.Reflection(params);
	newReflection.save(function (err, res) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			console.log("successfully created reflection " + newReflection._id);
			cb(newReflection._id);
		}
	});
}

mongodbClient.prototype.getWritePage = function(params, cb) {

	// validate params
	 currSunday = moment(params['cutoff_date'])
     var previousSunday = currSunday.subtract(7, 'days')
     console.log('previous sunday moment is '  + previousSunday)
     newDate = previousSunday.toDate();
     console.log('previous sunday date is '  + moment(previousSunday.toDate()).format('YYYY-MM-DD'))
	 var previousSundayString = moment(previousSunday.toDate()).format('YYYY-MM-DD')

	models.WritePage.findOne(
	    {user_name: params['user_name'],
        cutoff_date: {$gt: previousSundayString, $lte:params['cutoff_date']}},
        function(err, writepage) {
           if (err) {
              console.error(err);
                 cb(null);
              } else {
                 console.dir('write page ' + JSON.stringify(writepage))
                 cb(writepage);
              }
        });
}

mongodbClient.prototype.createWritePage = function(params, cb) {
	// validate params
	console.log("inside mongodb" + params)
	var newWritePage = new models.WritePage(params);
	newWritePage.save(function (err, res) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			console.log("successfully created writepage " + newWritePage._id);
			cb(newWritePage._id);
		}
	});
}




