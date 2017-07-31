'use strict';

var mongoose = require('mongoose'),
    submissions_schema;

submissions_schema = mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    work_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    files: [ mongoose.Schema.Types.ObjectId ],
    create_date: Date,
    report: String,
    self_assess: Number,
    mark: Number,
});

module.exports = mongoose.model('submissions', submissions_schema);