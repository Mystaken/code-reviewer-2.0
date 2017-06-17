'use strict';

var mongoose = require('mongoose'),
    deadline_schema;

deadline_schema = mongoose.Schema({
    deadline_type: {
        type: String,
        enum: ['peer_review_deadline'],
        required: true
    },
    deadline: Date,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});


module.exports = mongoose.model('submission_rules', deadline_schema);