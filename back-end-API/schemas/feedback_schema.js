var mongoose = require('mongoose');

var review_schema = new mongoose.Schema({
	work_id: mongoose.Schema.Types.ObjectId,
	author: mongoose.Schema.Types.ObjectId,		// author of code
	review_by: mongoose.Schema.Types.ObjectId,
	feedbacks: [String],
    mark : Number
});