'use strict';

var mongoose = require('mongoose'),
    submissions_files_schema;

submissions_files_schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    work_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    submission_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    code: {
      type: String,
      required: true
    },
    delete_date: Date,
    create_date: Date,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});

module.exports = mongoose.model('submission_files', submissions_files_schema);