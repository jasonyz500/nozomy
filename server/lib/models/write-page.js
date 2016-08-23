'use strict';

const mongoose = require('mongoose'),
	Boom = require('boom'),
    _ = require('lodash');

const Schema = mongoose.Schema;

let WritePageSchema = new Schema({
	user_id: String,
    username:String,
    cutoff_date: String,
	reflection_ids:[String]//{ type : Array , "default" : [] }
});
let WritePage = mongoose.model('WritePage', WritePageSchema);

let writePageModel = {};

writePageModel.getWritePage = function(params, user, cb) {

	// validate params
	 var currSunday = moment(params['cutoff_date']);
     var previousSunday = currSunday.subtract(7, 'days');
     console.log('previous sunday moment is '  + previousSunday);
     newDate = previousSunday.toDate();
     console.log('previous sunday date is '  + moment(previousSunday.toDate()).format('YYYY-MM-DD'));
	 var previousSundayString = moment(previousSunday.toDate()).format('YYYY-MM-DD');

	WritePage.findOne(
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

writePageModel.createWritePage = function(params, user, cb) {
	var newWritePage = new WritePage(params);
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

module.exports = writePageModel;