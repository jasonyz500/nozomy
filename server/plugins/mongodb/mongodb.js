var mongoose = require('mongoose'),
	models = require('./models'),
	moment = require('moment'),
	Boom = require('boom'),
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

mongodbClient.prototype.getWritePage = function(params, user, cb) {

	// validate params
	 currSunday = moment(params['cutoff_date'])
     var previousSunday = currSunday.subtract(7, 'days')
     console.log('previous sunday moment is '  + previousSunday)
     newDate = previousSunday.toDate();
     console.log('previous sunday date is '  + moment(previousSunday.toDate()).format('YYYY-MM-DD'))
	 var previousSundayString = moment(previousSunday.toDate()).format('YYYY-MM-DD')

	models.WritePage.findOne(
	    {username: user.username,
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

mongodbClient.prototype.createWritePage = function(params, user, cb) {
	var newWritePage = new models.WritePage(params);
	newWritePage.username = user.username;
	newWritePage.save(function (err, res) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			console.log("successfully created writepage", newWritePage);
			cb(newWritePage._id);
		}
	});
}

mongodbClient.prototype.createReflection = function(params, user, cb) {
	// validate params
	var newReflection = new models.Reflection(params);
	newReflection.username = user.username;
	newReflection.save(function (err, res) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			console.log("successfully created reflection", newReflection);
			cb(newReflection._id);
		}
	});
}

mongodbClient.prototype.getSingleReflection = function(id, user, cb) {
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

mongodbClient.prototype.getAllReflections = function(params, user, cb) {
	queryObj = {
		reflection_cutoff_date: {$gt: params.start_date, $lt:params.end_date}, 
		username: user.username
	};
	if (params.reflection_prompt) {
		queryObj.reflection_prompt = { $in : params.reflection_prompt };
	}
	models.Reflection.find(queryObj, function (err, reflections) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
	   		if (!reflections) {
	   			console.error("no reflections are found.");
		   		cb(null);
	   		} else {
	   	   		console.log('number of reflections found: ' + reflections.length)
	   	   		console.log('reflections: ' + reflections)
		   		cb(reflections);
	   		}
		}
	});
}

mongodbClient.prototype.updateSingleReflection = function(id, reflection_body, user, cb) {
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
					cb({"success": true, message: "successfully update reflection body"});
				}
			})
		}
	});
}

mongodbClient.prototype.getWritePageSettings = function(user, cb) {
	models.WritePageSetting.findOne({ 'username': user.username }, function (err, settings) {
		if (err) {
    		console.error(err);
    		cb(null);
    	} else {
    		if (settings){
    			console.log("find WritePageSettings")
				cb(settings);
    		} else {
    			console.log("can't find WritePageSettings, create a default one.")
    			default_reflection_prompts = ["What was the highlight of your week?", "What are your goals for next week?"]
				var newWritePageSetting = new models.WritePageSetting({"username": user.username, "reflection_prompts": default_reflection_prompts});
				newWritePageSetting.save(function (err, res) {
					if (err) {
						console.error(err);
						cb(null);
					} else {
						console.log("successfully created WritePageSetting " + res._id);
						cb(res);
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
    	WritePageSetting['username'] = 'qingzou'
    	WritePageSetting['reflection_prompts'] = []
    	WritePageSetting['reflection_prompts'].push('question1')
    	WritePageSetting['reflection_prompts'].push('question2')
    return cb(JSON.stringify(WritePageSetting))
    */
}

mongodbClient.prototype.updateWritePageSettings = function(params, user, cb) {
	models.WritePageSetting.findOne({ 'username': user.username }, function(err, setting) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			if (!setting){
    				console.error("can't find WritePageSettings for username: " + user.username)
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
						cb({"success": true, "message": "successfully update WritePageSetting"});
					}
				});
			}
		}
	});
}
