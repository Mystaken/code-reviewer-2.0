'use strict';

var mongoose = require('mongoose'),
    annotations_schema;

annotations_schema = mongoose.Schema({
    submission_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    submission_file_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    review_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    annotation: {
        type: String,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});

module.exports = mongoose.model('annotations', annotations_schema);
