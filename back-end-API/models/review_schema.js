var mongoose = require('mongoose');

// define studentSchema
var review_schema = new mongoose.Schema({
	author: String,
	review_by: String,
	feedbacks: Array, 
	highlights: String,
	num_stars : {
        type: Number,
        max: 5
    },
    mark : Number
});

module.exports = review_schema;
