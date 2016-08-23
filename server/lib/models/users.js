'use strict';

let mongoose = require('mongoose'),
	Boom = require('boom'),
    _ = require('lodash');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: String,
	department: String,
	given_name: String,
	email: String,
	auth_token: String,
	last_login: String
});

let User = mongoose.model('User', userSchema);

let userModel = {};

userModel.createOrUpdateUserLogin = function(params, cb) {
	User.findOne({username: params.username}, function(err, user) {
		if (err) {
			console.error(err);
		} else if (!user) {
			let newUser = new models.User(params);
			newUser.save(function (err, res) {
				if (err) {
					console.error(err);
					cb(Boom.badImplementation('Error creating new user: ' + err));
				} else {
					console.log("created new user", res);
					cb(res);
				}
			});
		} else {
			for (let key in params) {
				user[key] = params[key];
			}
			user.save(function(err) {
				if (err) {
					console.error(err);
					cb(Boom.badImplementation('Error saving user: ' + err));
				}
				cb(user);
			})
		}
	});
}

userModel.findUser = function(params, cb) {
	User.findOne({username: params.username}, function(err, user) {
		if (err || !user) {
			console.error(err || 'user not found!');
			cb(Boom.badImplementation('Error getting user: ' + err));
		} else {
			cb(user);
		}
	});
}

module.exports = userModel;
