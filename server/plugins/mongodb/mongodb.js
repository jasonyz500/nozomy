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
	models.WritePageSetting.findOne({ 'user_name': params.user_name }, function (err, settings) {
		if (err) {
    		console.error(err);
    		cb(null);
    	} else {
    		if (settings){
    			console.log("find WritePageSettings")
			cb(settings);
    		}
    		else{
    			console.log("can't find WritePageSettings, create a default one.")
    			default_reflection_prompts = ["prompt1", "prompt2"]
			var newWritePageSetting = new models.WritePageSetting({"user_name": params.user_name,
		                                                               "reflection_prompts": default_reflection_prompts});
			newWritePageSetting.save(function (err, res) {
				if (err) {
					console.error(err);
					cb(null);
				} else {
					console.log("successfully created WritePageSetting " + newWritePageSetting._id);
					cb(newWritePageSetting);
				}
			});
    		}		
    	}
	});
	// validate params
	/*models.WritePageSetting.findById(id, function(err, settings) {
    		if (err) {
    			console.error(err);
    			cb(null);
    		} else {
    			cb(settings);
    		}
    	});*/
    /*
    	WritePageSetting = {}
    	WritePageSetting['user_name'] = 'qingzou'
    	WritePageSetting['reflection_prompts'] = []
    	WritePageSetting['reflection_prompts'].push('question1')
    	WritePageSetting['reflection_prompts'].push('question2')
    return cb(JSON.stringify(WritePageSetting))
    */
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
	models.WritePage.findOne(
	    {user_name: params['user_name'],
        cutoff_date: {$gt: '20160101', $lt:params['cutoff_date']}},
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

mongodbClient.prototype.getSingleReflection = function(id, cb) {
	console.log(id)
	models.Reflection.findById(id, function(err, reflection) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			cb(reflection);
		}
	});
}

mongodbClient.prototype.updateSingleReflection = function(id, reflection_body, cb) {
	models.Reflection.findById(id, function(err, reflection) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			reflection.reflection_body = reflection_body
			reflection.save(function (err, res) {
				if (err) {
					console.error(err);
					cb(null);
				} else {
					console.log("successfully update reflection body");
					cb("successfully update reflection body");
				}
			})
		}
	});
}

mongodbClient.prototype.updateWritePageSettings = function(params, cb) {
	models.WritePageSetting.findOne({ 'user_name': params.user_name }, function(err, setting) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			if (!setting){
    				console.error("can't find WritePageSettings for user_name: " + params.user_name)
				cb(null);
    			}
    			else{
				setting.reflection_prompts = params.reflection_prompts
				setting.save(function (err, res) {
					if (err) {
						console.error(err);
						cb(null);
					} else {
						console.log("successfully update WritePageSetting");
						cb("successfully update WritePageSetting");
					}
				});
			}
		}
	});
}

mongodbClient.prototype.getAllReflections = function(params, cb) {
  // console.dir({post_date: {$gt: params.start_date, $lt:params.end_date}})
	if (!params.reflection_prompt){
		models.Reflection.find({reflection_cutoff_date: {$gt: params.start_date, $lt:params.end_date}},
			function (err, reflections) {
				if (err) {
			   		console.error(err);
			   		cb(null);
		   		} else {
		   	  		console.log('number of reflections found: ' + reflections.length)
		   	  		console.log('reflections: ' + reflections)
			  		cb(reflections);
		   		}
	   	});
  	}
	else{
		models.Reflection.find({reflection_cutoff_date: {$gt: params.start_date, $lt:params.end_date}, 
		                        reflection_prompt: { $in : params.reflection_prompt}},
		function (err, reflections) {
			if (err) {
				console.error(err);
				cb(null);
			} else {
		   		if (!reflections){
		   			console.error("no reflections are found.");
			   		cb(null);
		   		}
		   		else{
		   	   		console.log('number of reflections found: ' + reflections.length)
		   	   		console.log('reflections: ' + reflections)
			   		cb(reflections);
		   		}
			}
		});
	}
}
