'use strict';

var mongoose = require('mongoose'),
    submission_rules_schema;

submission_rules_schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uinque: true
    },
    num_peers : {
        type: Number,
        min: 0,
        max: 7
    },
    required_files : [String],
    repo_path: String,
    folder_name: String,
    feedback_questions: [String],
    peer_review: Boolean,
    self_review: Boolean,
    mark_review: Boolean,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});


module.exports = mongoose.model('works', submission_rules_schema);