'use strict';

var mongoose = require('mongoose'),
    submissions_schema;

submissions_schema = mongoose.Schema({
    author_id: mongoose.Schema.Types.ObjectId,        // utorid of the student
    code: String,                       // file content
    file_name: String,
    report: String,                     // the report.txt
    self_assess: Number,               // mark by author himself
    mark: Number,                      // actual mark of this submission
    delete_date: Date,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});

module.exports = mongoose.model('submissions', submissions_schema);