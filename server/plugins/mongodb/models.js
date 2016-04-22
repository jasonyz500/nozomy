var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var models = {};

var chartSchema = new Schema({
	user_id: String,
    user_name:String,
    post_date: String,
	question: String,
	moment: String
});
var Post = mongoose.model('Post', chartSchema);
models.Post = Post;

module.exports = models;
