'use strict';

var mongoose = require('mongoose'),
    feedback_questions_schema;

feedback_questions_schema = mongoose.Schema({
    feedback : {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
});


module.exports = mongoose.model('feedback_questions', feedback_questions_schema);