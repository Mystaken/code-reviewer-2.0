'use strict';

var mongoose = require('mongoose'),
    feedbacks_schema;

feedbacks_schema = new mongoose.Schema({
	work_id: mongoose.Schema.Types.ObjectId,
	author: mongoose.Schema.Types.ObjectId,		// author of code
	review_by: mongoose.Schema.Types.ObjectId,
	feedbacks: [String],
    mark : Number
});

module.exports = mongoose.model('feedbacks', feedbacks_schema);