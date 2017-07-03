'use strict';

var mongoose = require('mongoose'),
    submission_files;

submission_files_schema = mongoose.Schema({
    submission_id: mongoose.Schema.Types.ObjectId,
    work_id: mongoose.Schema.Types.ObjectId,
    author: mongoose.Schema.Types.ObjectId,
    code:
});

module.exports = mongoose.model('submission_files', submissions_schema);