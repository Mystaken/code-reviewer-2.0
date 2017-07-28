'use strict';

var mongoose = require('mongoose'),
    submissions_schema;

submissions_schema = mongoose.Schema({
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
    code: String,
    report: String,
    self_assess: Number,
    mark: Number,
    delete_date: Date,
    create_date: Date,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});

module.exports = mongoose.model('submissions', submissions_schema);