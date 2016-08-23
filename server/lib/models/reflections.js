'use strict';

const mongoose = require('mongoose'),
	Boom = require('boom'),
    _ = require('lodash');

const Schema = mongoose.Schema;

let ReflectionSchema = new Schema({
	user_id: String,
    username:String,
    reflection_cutoff_date: String,
    reflection_prompt: String,
	reflection_body:String
});
let Reflection = mongoose.model('Reflection', ReflectionSchema);

let reflectionsModel = {};

reflectionsModel.createReflection = function(params, user, cb) {
	// validate params
	var newReflection = new Reflection(params);
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

reflectionsModel.getSingleReflection = function(id, user, cb) {
	Reflection.findById(id, function(err, reflection) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			cb(reflection);
		}
	});
}

reflectionsModel.getAllReflections = function(params, user, cb) {
	var queryObj = {
		reflection_cutoff_date: {$gte: params.start_date, $lte:params.end_date}, 
		username: user.username
	};
	if (params.reflection_prompt) {
		queryObj.reflection_prompt = { $in : params.reflection_prompt };
	}
	Reflection.find(queryObj).sort('-reflection_cutoff_date').exec(function (err, reflections) {
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

reflectionsModel.updateSingleReflection = function(id, reflection_body, user, cb) {
	Reflection.findById(id, function(err, reflection) {
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

module.exports = reflectionsModel;