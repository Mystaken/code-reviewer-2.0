'use strict';

var mongoose = require('mongoose'),
    annotations_schema;

annotations_schema = mongoose.Schema({
    submission_id: mongoose.Schema.Types.ObjectId,
    review_by: mongoose.Schema.Types.ObjectId,          // the student id who writes this review
    annotation: String,
    start: Number,
    end: Number,
    status: String    //active, inactive
});

module.exports = mongoose.model('annotations', annotations_schema);
