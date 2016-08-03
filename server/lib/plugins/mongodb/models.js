var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var models = {};

var WritePageSchema = new Schema({
	user_id: String,
    username:String,
    cutoff_date: String,
	reflection_ids:[String]//{ type : Array , "default" : [] }
});
var WritePage = mongoose.model('WritePage', WritePageSchema);
models.WritePage = WritePage;

var WritePageSettingSchema = new Schema({
	user_id: String,
    username:String,
    reflection_prompts: [String],
	last_updated:String
});
var WritePageSetting = mongoose.model('WritePageSetting', WritePageSettingSchema);
models.WritePageSetting = WritePageSetting;

var ReflectionSchema = new Schema({
	user_id: String,
    username:String,
    reflection_cutoff_date: String,
    reflection_prompt: String,
	reflection_body:String
});
var Reflection = mongoose.model('Reflection', ReflectionSchema);
models.Reflection = Reflection;


module.exports = models;
