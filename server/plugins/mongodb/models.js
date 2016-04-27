var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var models = {};

var postSchema = new Schema({
	user_id: String,
    user_name:String,
    post_date: String,
	question: String,
	moment: String
});
var Post = mongoose.model('Post', postSchema);
models.Post = Post;

var WritePageSchema = new Schema({
	user_id: String,
    user_name:String,
    cutoff_date: String,
	reflection_ids:[String]//{ type : Array , "default" : [] }
});
var WritePage = mongoose.model('WritePage', WritePageSchema);
models.WritePage = WritePage;

var WritePageSettingSchema = new Schema({
	user_id: String,
    user_name:String,
    reflection_prompts: String,
	last_updated:String
});
var WritePageSetting = mongoose.model('WritePageSetting', WritePageSettingSchema);
models.WritePageSetting = WritePageSetting;

var ReflectionSchema = new Schema({
	user_id: String,
    user_name:String,
    reflection_cutoff_date: String,
    reflection_prompts: String,
	reflection_body:String
});
var Reflection = mongoose.model('Reflection', ReflectionSchema);
models.Reflection = Reflection;


module.exports = models;
