'use strict';

const mongoose = require('mongoose'),
	Boom = require('boom'),
    _ = require('lodash');

const Schema = mongoose.Schema;

let SettingsSchema = new Schema({
	user_id: String,
    username:String,
    reflection_prompts: [String],
	last_updated:String
});
let Settings = mongoose.model('Settings', SettingsSchema);

let settingsModel = Settings;

settingsModel.getWritePageSettings = function(user, cb) {
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
}

settingsModel.updateWritePageSettings = function(params, user, cb) {
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

module.exports = settingsModel;