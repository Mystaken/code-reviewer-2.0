'use strict';

var mongoose = require('mongoose'),
    annotationsSchema;

annotationsSchema = mongoose.Schema({
    work_id: mongoose.Schema.Types.ObjectId,
    review_by: mongoose.Schema.Types.ObjectId,          // the student id who writes this review
    annotation: String,
    start: Number,
    end: Number
});

module.exports = mongoose.model('annotations', annotationsSchema);
